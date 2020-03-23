const IssuesService = {
    getAllIssues(knex, user_id){
        console.log(user_id)
        return knex
            .select('*')
            .from('issues')
            .where('user_id', user_id)
    },

    getById(knex, id){
        return knex
            .select('*')
            .from('issues')
            .where('id', id)
            .first()
    },

    insertIssue(knex, newIssue) {
        return knex 
            .insert(newIssue)
            .into('issues')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getIssueNotes(knex, issue_id) {
        return knex
            .select('*')
            .from('issue_notes')
            .where('issue_id', issue_id)
    },

    getByDateCreated(knex, date_created) {
        return knex
            .select('*')
            .from('issues')
            .where('date_created', date_created)
            .first()
    },

    insertIssueNote(knex, newIssueNote) {
        return knex
            .insert(newIssueNote)
            .into('issue_notes')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    updateIssue(knex, id, newIssueFields) {
        return knex('issues')
        .where({ id })
        .update(newIssueFields)
    },
}

module.exports = IssuesService;