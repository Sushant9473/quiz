const express = require('express');
const {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require('../controllers/quizController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getQuizzes).post(protect, createQuiz);
router
  .route('/:id')
  .get(getQuiz)
  .put(protect, updateQuiz)
  .delete(protect, deleteQuiz);

module.exports = router;