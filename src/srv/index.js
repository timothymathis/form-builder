const MockAssessment = require('./MockAssessment');
const MockQuestionType = require('./MockQuestionType');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('./db/db_connect');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const Assessment = require('./db/assessment');
const Question = require('./db/question');
const Action = require('./db/action');

const SERVER_PORT = 4000;

function logger(req, res, next) {
  console.log(`${req.url} : ${req.method}`);
  next();
}

app.use(bodyParser.json());
app.use(cors());
app.use(logger);

app.get('/ping', (req, res) => {
  return res.json('pong');
});

/* Assessment endpoints */

app.get('/assessment/:id', (req, res) => {
  const assessmentId = req.params.id;
  Assessment.get(assessmentId).then(assessment => res.json(assessment));
});

/* Question endpoints */

app.post('/question', (req, res) => {
  const question = req.body;
  // Create the question
  Question.create(question).then(newQuestion => {
    // Add the question to the assessment
    Assessment.addQuestion(newQuestion).then(() => res.json(newQuestion));
    // Add action to audit trail
    Action.create({
      type: 'CREATE',
      changes: {
        prevState: null,
        nextState: newQuestion
      },
      user: '1',
      timestamp: Date.now()
    });
  });
});

app.put('/question', (req, res) => {
  const questionWithChanges = req.body;
  // Update the question
  Question.update(questionWithChanges).then(preupdatedQuestion => {
    // Add action to audit trail
    Action.create({
      type: 'UPDATE',
      changes: {
        prevState: preupdatedQuestion,
        nextState: questionWithChanges
      },
      user: '1',
      timestamp: Date.now()
    });
    return res.json(questionWithChanges);
  });
});

app.delete('/question/:id', (req, res) => {
  const questionId = req.params.id;
  // Delete question
  Question.delete(questionId).then(deletedQuestion => {
    // Remove question from assessment
    Assessment.removeQuestion(deletedQuestion).then(() =>
      res.json(deletedQuestion)
    );
    // Add action to audit trail
    Action.create({
      type: 'DELETE',
      changes: {
        prevState: deletedQuestion,
        nextState: null
      },
      user: '1',
      timestamp: Date.now()
    });
  });
});

/* Action endpoints */

app.get('/action/undo/:id', (req, res) => {
  const userId = req.params.id;
  Action.getAndRemoveLatest(userId).then(latestAction => {
    switch (latestAction.type) {
      case 'CREATE':
        const questionId = latestAction.changes.nextState._id;
        // Delete the created question
        Question.delete(questionId).then(deletedQuestion => {
          // Remove question from assessment
          Assessment.removeQuestion(deletedQuestion).then(() =>
            res.json(deletedQuestion)
          );
        });
        break;
      case 'UPDATE':
        // Update the question with previous state
        const questionWithChanges = latestAction.changes.prevState;
        // Update the question
        Question.update(questionWithChanges).then(preupdatedQuestion =>
          res.json(questionWithChanges)
        );
        break;
      case 'DELETE':
        // Create previously delete question
        const question = latestAction.changes.prevState;
        Question.create(question).then(newQuestion => {
          // Add the question to the assessment
          Assessment.addQuestion(newQuestion).then(() => res.json(newQuestion));
        });
        break;
      default:
        break;
    }
    return res.json(latestAction);
  });
});

app.get('/action/:id', (req, res) => {
  const userId = req.params.id;
  Action.getAll(userId).then(actions => res.json(actions));
});

/* QuestionType endpoints */

app.get('/questionType/', (req, res) => {
  return res.json(MockQuestionType);
});

app.listen(SERVER_PORT, () => {
  console.log(`server started on port ${SERVER_PORT}`);
});
