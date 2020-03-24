const express = require('express');
const jsonParser = express.json();
const ProjectsService = require('../Projects-service');
const ProjectsRouter = express.Router();

ProjectsRouter
    .route('/')
    .get((req, res, next) => {
        ProjectsService.getAllProjects(
            req.app.get('db'),
            req.query.user_id
        )
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { user_id, name } = req.body;
        const date_created = new Date().toISOString();
        const newProject = {date_created, name, user_id};
        console.log(req.body)
        ProjectsService.insertProject(
            req.app.get('db'),
            newProject
        ).then(project => {
            ProjectsService.getByDateCreated(
                req.app.get('db'), 
                project.date_created
            ).then(project => {
                res
                .status(201)
                .location(`project/${project.id}`)
                .json(project)
            }).catch(next)
        }).catch(next)
    })

ProjectsRouter
  .route('/:projects_id')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ProjectsService.getById(knexInstance, req.params.projects_id)
      .then(project => {
        if (!project) {
          return res.status(404).json({
            error: { message: `project doesn't exist` }
          })
        }
        res.json(project)
      })
      .catch(next)
  })

module.exports = ProjectsRouter;