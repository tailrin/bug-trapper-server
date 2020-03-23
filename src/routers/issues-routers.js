const express = require('express');
const jsonParser = express.json();
const IssuesService = require('../issues-service');
const IssuesRouter = express.Router();

IssuesRouter
    .route('/')
    .get((req, res, next) => {
        IssuesService.getAllIssues(
            req.app.get('db'),
            req.query.user_id
        )
        .then(issues => {
            res.json(issues)
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { project_id, user_id, date_created, description, status } = req.body;
        const newIssue = {date_created, description, project_id, status, user_id};
        IssuesService.insertIssue(
            req.app.get('db'),
            newIssue
        ).then(issue => {
            IssuesService.getByDateCreated(
                req.app.get('db'), 
                issue.date_created
            ).then(issue => {
                res
                .status(201)
                .location(`issue/${issue.id}`)
                .json(issue)
            })
        })
    })

IssuesRouter
  .route('/:issues_id')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    IssuesService.getById(knexInstance, req.params.issues_id)
      .then(async issue => {
          const response = {
              issue: issue,
          };
          const notes = await IssuesService.getIssueNotes(knexInstance, issue.id)
          response.notes = notes

        if (!issue) {
          return res.status(404).json({
            error: { message: `issue doesn't exist` }
          })
        }
        res.json(response)
      })
      .catch(next)
  })

    module.exports = IssuesRouter;