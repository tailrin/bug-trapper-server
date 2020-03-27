const express = require('express');
const jsonParser = express.json();
const IssuesService = require('../issues-service');
const IssuesRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth')

IssuesRouter
    .route('/')
    .all(requireAuth)
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
        const { project_id, user_id, description, status } = req.body;
        const date_created = new Date().toISOString();
        const date_modified = new Date().toISOString();
        const newIssue = {date_created, description, project_id, status, user_id, date_modified};
        console.log(req.body)
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
                .location(`issues/${issue.id}`)
                .json(issue)
            }).catch(next)
        }).catch(next)
    })

IssuesRouter
  .route('/:issue_id')
  .all(requireAuth)
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    IssuesService.getById(knexInstance, req.params.issue_id)
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
  .put(jsonParser, (req, res, next) => {
      const knex = req.app.get('db')
      const {issue_id} = req.params
      const {field, field_value} = req.body
      IssuesService.updateIssue(knex, issue_id, field, field_value)
      .then(response => {
          res.json(response)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const knex = req.app.get('db')
    const {issue_id} = req.params
    const {content} = req.body
    const date_created = new Date().toISOString();
    const newNote = {issue_id: issue_id, content: content, date_created: date_created}
    IssuesService.insertIssueNote(knex, newNote)
    .then(response => res.json(response))
    .catch(next)
  })

    module.exports = IssuesRouter;

