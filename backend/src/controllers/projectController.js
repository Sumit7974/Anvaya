const Project = require('../models/Project');
const Worker = require('../models/Worker');

// Create a new contractor project
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      workersRequired,
      location
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: 'Project title is required'
      });
    }

    if (
      !Array.isArray(workersRequired) ||
      workersRequired.length === 0
    ) {
      return res.status(400).json({
        message: 'At least one worker requirement is required'
      });
    }

    for (const requirement of workersRequired) {
      if (
        !requirement.skill ||
        !Number.isInteger(Number(requirement.count)) ||
        Number(requirement.count) < 1
      ) {
        return res.status(400).json({
          message: 'Each worker requirement must contain a valid skill and count'
        });
      }
    }

    if (location) {
      if (
        location.type !== 'Point' ||
        !Array.isArray(location.coordinates) ||
        location.coordinates.length !== 2
      ) {
        return res.status(400).json({
          message: 'Location must be a valid GeoJSON Point'
        });
      }

      const [lng, lat] = location.coordinates;

      if (
        typeof lng !== 'number' ||
        typeof lat !== 'number' ||
        lng < -180 ||
        lng > 180 ||
        lat < -90 ||
        lat > 90
      ) {
        return res.status(400).json({
          message: 'Invalid longitude or latitude'
        });
      }
    }

    const project = await Project.create({
      contractor: req.user.id,
      title,
      description,
      workersRequired: workersRequired.map(item => ({
        skill: item.skill.toLowerCase().trim(),
        count: Number(item.count)
      })),
      location,
      status: 'open'
    });

    res.status(201).json({
      message: 'Project created successfully',
      project
    });

  } catch (error) {
    console.error('Create project error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};


// Get contractor's own projects
const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      contractor: req.user.id
    })
      .populate('assignedWorkers.worker', 'name phone skills rating location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: projects.length,
      projects
    });

  } catch (error) {
    console.error('Get my projects error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};


// Get one project belonging to the logged-in contractor
const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      contractor: req.user.id
    })
      .populate(
        'assignedWorkers.worker',
        'name phone skills rating location verification'
      );

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    res.status(200).json({
      project
    });

  } catch (error) {
    console.error('Get project error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};


// Find workers suitable for a project
const findWorkers = async (req, res) => {
  try {
    const { skill, longitude, latitude, radius = 10 } = req.query;

    if (!skill) {
      return res.status(400).json({
        message: 'Skill is required'
      });
    }

    if (longitude === undefined || latitude === undefined) {
      return res.status(400).json({
        message: 'Longitude and latitude are required'
      });
    }

    const lng = Number(longitude);
    const lat = Number(latitude);
    const radiusInMeters = Number(radius) * 1000;

    if (
      Number.isNaN(lng) ||
      Number.isNaN(lat) ||
      Number.isNaN(radiusInMeters)
    ) {
      return res.status(400).json({
        message: 'Invalid location or radius'
      });
    }

    if (
      lng < -180 ||
      lng > 180 ||
      lat < -90 ||
      lat > 90 ||
      radiusInMeters <= 0
    ) {
      return res.status(400).json({
        message: 'Invalid location or radius'
      });
    }

    const workers = await Worker.find({
      isActive: true,
      isAvailable: true,
      'verification.status': 'verified',
      skills: skill.toLowerCase().trim(),
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: radiusInMeters
        }
      }
    })
      .select('-passwordHash')
      .sort({ 'rating.average': -1 });

    res.status(200).json({
      count: workers.length,
      skill: skill.toLowerCase().trim(),
      radiusKm: Number(radius),
      workers
    });

  } catch (error) {
    console.error('Find project workers error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};


// Assign/invite a worker to a project
const assignWorker = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { workerId } = req.body;

    if (!workerId) {
      return res.status(400).json({
        message: 'Worker ID is required'
      });
    }

    const project = await Project.findOne({
      _id: projectId,
      contractor: req.user.id
    });

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    if (project.status === 'completed') {
      return res.status(400).json({
        message: 'Cannot assign workers to a completed project'
      });
    }

    const worker = await Worker.findOne({
      _id: workerId,
      isActive: true,
      'verification.status': 'verified'
    });

    if (!worker) {
      return res.status(404).json({
        message: 'Worker not found, inactive, or not verified'
      });
    }

    const alreadyAssigned = project.assignedWorkers.some(
      item => item.worker && item.worker.toString() === workerId
    );

    if (alreadyAssigned) {
      return res.status(400).json({
        message: 'Worker is already assigned to this project'
      });
    }

    project.assignedWorkers.push({
      worker: workerId,
      status: 'invited'
    });

    await project.save();

    res.status(200).json({
      message: 'Worker invited to project successfully',
      project
    });

  } catch (error) {
    console.error('Assign worker error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};


// Update worker assignment status
const updateWorkerAssignment = async (req, res) => {
  try {
    const { projectId, workerId } = req.params;
    const { status } = req.body;

    if (!['invited', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        message: 'Status must be invited, accepted, or rejected'
      });
    }

    const project = await Project.findOne({
      _id: projectId,
      contractor: req.user.id
    });

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    const assignment = project.assignedWorkers.find(
      item => item.worker && item.worker.toString() === workerId
    );

    if (!assignment) {
      return res.status(404).json({
        message: 'Worker is not assigned to this project'
      });
    }

    assignment.status = status;

    await project.save();

    res.status(200).json({
      message: 'Worker assignment updated successfully',
      project
    });

  } catch (error) {
    console.error('Update worker assignment error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};


// Update project status
const updateProjectStatus = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      'draft',
      'open',
      'in-progress',
      'completed'
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid project status'
      });
    }

    const project = await Project.findOne({
      _id: projectId,
      contractor: req.user.id
    });

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    project.status = status;

    await project.save();

    res.status(200).json({
      message: 'Project status updated successfully',
      project
    });

  } catch (error) {
    console.error('Update project status error:', error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};


module.exports = {
  createProject,
  getMyProjects,
  getProjectById,
  findWorkers,
  assignWorker,
  updateWorkerAssignment,
  updateProjectStatus
};