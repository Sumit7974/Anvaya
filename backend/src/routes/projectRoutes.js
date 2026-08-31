const express = require('express');

const {
  createProject,
  getMyProjects,
  getProjectById,
  findWorkers,
  assignWorker,
  updateWorkerAssignment,
  updateProjectStatus
} = require('../controllers/projectController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Contractor creates a project
router.post(
  '/',
  protect,
  authorize('contractor'),
  createProject
);

// Contractor views all their projects
router.get(
  '/my',
  protect,
  authorize('contractor'),
  getMyProjects
);

// Find verified and available workers for a project
router.get(
  '/workers/find',
  protect,
  authorize('contractor'),
  findWorkers
);

// Get one project
router.get(
  '/:projectId',
  protect,
  authorize('contractor'),
  getProjectById
);

// Invite/assign a worker to a project
router.post(
  '/:projectId/workers',
  protect,
  authorize('contractor'),
  assignWorker
);

// Update worker assignment status
router.patch(
  '/:projectId/workers/:workerId',
  protect,
  authorize('contractor'),
  updateWorkerAssignment
);

// Update project status
router.patch(
  '/:projectId/status',
  protect,
  authorize('contractor'),
  updateProjectStatus
);

module.exports = router;