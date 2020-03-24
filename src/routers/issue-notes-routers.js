const express = require('express');
const jsonParser = express.json();
const IssueNotesService = require('../issues-notes-service');
const IssueNotesRouter = express.Router();

IssueNotesRouter
    .route('/:issue_id')
    .get((req, res, next) => {
        console.log(req.params)
        IssueNotesService.getAllIssueNotes(
            req.app.get('db'),
            parseInt(req.params.issue_id)
        )
        .then(issueNotes => {
            res.json(issueNotes)
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { issue_id, content} = req.body;
        const date_created = new Date().toISOString();
        const newIssueNote = {issue_id, content, date_created}
        IssueNotesService.insertIssueNote(
            req.app.get('db'),
            newIssueNote
        ).then(issueNote => {
            IssueNotesService.getByDateCreated(
                req.app.get('db'),
                issueNote.date_created
            ).then(issueNote => {
                res
                .status(201)
                .location(`/`)
                .json(issueNote)
            }).catch(next)
        }).catch(next)

    })

module.exports = IssueNotesRouter;