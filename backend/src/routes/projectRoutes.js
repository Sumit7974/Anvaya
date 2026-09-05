const express = require('express');

const {
  createProject,
  getMyProjects,
  getProjectById,
  findWorkers,
  assignWorker,
  assignWorkers,
  updateWorkerAssignment,
  updateProjectStatus
} = require('../controllers/projectController');

const { protect, authorize } = require('../middleware/authMiddleware');
const validateObjectId = require('../middleware/validateObjectId');

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
  validateObjectId('projectId'),
  authorize('contractor'),
  getProjectById
);

// Invite/assign a worker to a project
router.post(
  '/:projectId/workers',
  protect,
  validateObjectId('projectId'),
  authorize('contractor'),
  assignWorker
);

router.post(
  '/:projectId/workers/bulk',
  protect,
  validateObjectId('projectId'),
  authorize('contractor'),
  assignWorkers
);

// Update worker assignment status
router.patch(
  '/:projectId/workers/:workerId',
  protect,
  validateObjectId('projectId'),
  validateObjectId('workerId'),
  authorize('contractor'),
  updateWorkerAssignment
);

// Update project status
router.patch(
  '/:projectId/status',
  protect,
  validateObjectId('projectId'),
  authorize('contractor'),
  updateProjectStatus
);

module.exports = router;