const IssueNotesService = {
    getAllIssueNotes(knex, issue_id){
        return knex
            .select('*')
            .from('issue_notes')
            .where('issue_id', issue_id)
    },

    getByDateCreated(knex, date_created){
        return knex
            .select('*')
            .from('issue_notes')
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
    }
}

module.exports = IssueNotesService;