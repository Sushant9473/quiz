const asyncHandler = require('express-async-handler');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
exports.getQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find().populate('questions');
  res.status(200).json({ success: true, count: quizzes.length, data: quizzes });
});

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Public
exports.getQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).populate('questions');

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  res.status(200).json({ success: true, data: quiz });
});

// @desc    Create new quiz
// @route   POST /api/quizzes
// @access  Private
exports.createQuiz = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  const quiz = await Quiz.create(req.body);
  res.status(201).json({ success: true, data: quiz });
});

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private
exports.updateQuiz = asyncHandler(async (req, res) => {
  let quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  // Make sure user is quiz owner
  if (quiz.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to update this quiz');
  }

  quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: quiz });
});

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private
exports.deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  // Make sure user is quiz owner
  if (quiz.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to delete this quiz');
  }

  await quiz.remove();

  res.status(200).json({ success: true, data: {} });
});