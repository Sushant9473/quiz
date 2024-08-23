const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add a question text'],
    trim: true,
    maxlength: [500, 'Question text can not be more than 500 characters'],
  },
  type: {
    type: String,
    enum: ['multiple', 'boolean'],
    required: [true, 'Please specify the question type'],
  },
  choices: [
    {
      text: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
  quiz: {
    type: mongoose.Schema.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Question', QuestionSchema);