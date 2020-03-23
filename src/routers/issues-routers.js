const express = require('express');
const jsonParser = express.json();
const IssuesService = require('../issues-service');
const IssuesRouter = express.Router();

IssuesRouter
    .route('/')
    .get((req, res, next) => {
        console.log(req.query.user_id)
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
            const newIssueNote = { issue_id, content, date_created };
            IssuesService.insertIssueNote(
                req.app.get('db'),
                newIssueNote
            ).then(issue_note => {
                res
                    .status(201)
                    .location(`/issue/${issue_id}/issue_notes`)
                    .json(issue_note)
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