const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const actionSchema = new Schema({
  type: String,
  changes: {
    prevState: Object,
    nextState: Object
  },
  user: String,
  timestamp: String
});

// Gets all actions by user id
actionSchema.statics.getAll = function(userId) {
  return new Promise((resolve, reject) => {
    this.find({ user: userId })
      .sort({ timestamp: -1 })
      .exec((err, actions) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(actions);
      });
  });
};

// Gets the latest action by user id
actionSchema.statics.getAndRemoveLatest = function(userId) {
  return new Promise((resolve, reject) => {
    this.find({ user: userId })
      .sort({ timestamp: -1 })
      .exec((err, actions) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        const latestAction = actions[0];
        this.remove({ _id: latestAction._id }, err => {
          if (err) {
            console.error(err);
            reject(err);
          }
          resolve(latestAction);
        });
      });
  });
};

// Creates a new action
actionSchema.statics.create = function(action) {
  return new Promise((resolve, reject) => {
    new Action(action).save((err, newAction) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(newAction);
    });
  });
};

const Action = mongoose.model('Action', actionSchema, 'actions');

module.exports = Action;
