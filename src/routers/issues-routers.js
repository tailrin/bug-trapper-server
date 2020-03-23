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
        if(!!req.content){
            const { issue_id, content, date_created} = req.body;
            const newIssueissue = { issue_id, content, date_created };
            IssuesService.insertIssueissue(
                req.app.get('db'),
                newIssueissue
            ).then(issue_issue => {
                res
                    .status(201)
                    .location(`/issue/${issue_id}/issue_issues`)
                    .json(issue_issue)
              })
              .catch(next)
        } else {
            const { project_id, user_id, date_created, date_modified, description, status } = req.body;
            const newIssue = { project_id, user_id, date_created, date_modified, description, status };
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
        }
        
    })

IssuesRouter
  .route('/:issues_id')
  .get((req, res, next) => {
    console.log(req.params.issue_id)
    const knexInstance = req.app.get('db')
    IssuesService.getById(knexInstance, req.params.issue_id)
      .then(issue => {
        if (!issue) {
          return res.status(404).json({
            error: { message: `issue doesn't exist` }
          })
        }
        res.json(issue)
      })
      .catch(next)
  })

    module.exports = IssuesRouter;