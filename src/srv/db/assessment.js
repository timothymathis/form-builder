const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const assessmentSchema = new Schema({
  name: String,
  questions: [
    {
      type: ObjectId,
      ref: 'Question'
    }
  ]
});

// Gets an assessment by id with questions populated
assessmentSchema.statics.get = function(assessmentId) {
  return new Promise((resolve, reject) => {
    this.findOne({ _id: assessmentId })
      .populate('questions')
      .exec((err, assessment) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(assessment);
      });
  });
};

// Adds a question to an assessment
assessmentSchema.statics.addQuestion = function(question) {
  return new Promise((resolve, reject) => {
    this.update(
      { _id: question.assessment },
      { $push: { questions: question._id } },
      (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(result);
      }
    );
  });
};

// Removes a question from an assessment
assessmentSchema.statics.removeQuestion = function(question) {
  return new Promise((resolve, reject) => {
    this.update(
      { _id: question.assessment },
      { $pullAll: { questions: [question._id] } },
      (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(result);
      }
    );
  });
};

const Assessment = mongoose.model(
  'Assessment',
  assessmentSchema,
  'assessments'
);

module.exports = Assessment;
