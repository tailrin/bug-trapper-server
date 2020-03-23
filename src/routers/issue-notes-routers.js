const express = require('express');
const jsonParser = express.json();
const IssueNotesService = require('../issues-notes-service');
const IssueNotesRouter = express.Router();

IssueNotesRouter
    .route('/')
    .get((req, res, next) => {
        IssueNotesService.getAllIssueNotes(
            req.app.get('db')
        )
        .then(issueNotes => {
            res.json(issueNotes)
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { issue_id, content} = req.body;
        const date_created = new Date().toISOString();
        const newIssueNote = {issue_id, content}
    })