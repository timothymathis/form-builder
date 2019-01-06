const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const questionSchema = new Schema({
  assessment: { type: ObjectId, ref: 'Assessment' },
  type: String,
  required: Boolean,
  descriptionEnabled: Boolean,
  text: String,
  description: String,
  randomizeChoices: Boolean,
  order: Number
});

// Creates a new question
questionSchema.statics.create = function(question) {
  return new Promise((resolve, reject) => {
    new Question(question).save((err, newQuestion) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(newQuestion);
    });
  });
};

// Updates a question
questionSchema.statics.update = function(question) {
  return new Promise((resolve, reject) => {
    this.findOneAndUpdate(
      { _id: question._id },
      { ...question },
      (err, preupdatedQuestion) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(preupdatedQuestion);
      }
    );
  });
};

// Deletes a question by id
questionSchema.statics.delete = function(questionId) {
  return new Promise((resolve, reject) => {
    this.findOneAndDelete({ _id: questionId }, (err, deletedQuestion) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(deletedQuestion);
    });
  });
};

const Question = mongoose.model('Question', questionSchema, 'questions');

module.exports = Question;
