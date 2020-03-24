

const ProjectsService = {
    getAllProjects(knex, user_id){
        return knex
            .select('*')
            .from('projects')
            .where('user_id', user_id)
    },

    getById(knex, id){
        return knex
            .select('*')
            .from('projects')
            .where('id', id)
            .first()
    },

    getByDateCreated(knex, date_created) {
        return knex
            .select('*')
            .from('projects')
            .where('date_created', date_created)
            .first()
    },

    insertProject(knex, newProject) {
        return knex 
            .insert(newProject)
            .into('projects')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteProject(knex, id){
        return knex('projects')
            .where({id})
            .delete()
    }
}

module.exports = ProjectsService;