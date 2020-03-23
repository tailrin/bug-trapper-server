const IssueNotesService = {
    getAllIssueNotes(knex, issue_id){
        return knex
            .select('*')
            .from('issue_notes')
            .where('issue_id', issue_id)
    },

    getById(knex, id){
        return knex
            .select('*')
            .from('issue_notes')
            .where('id', id)
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

    updateIssue(knex, id, newIssueNotes) {
        return knex('issue_notes')
        .where({ id })
        .update(newIssueNotes)
    },
}

module.exports = IssueNotesService;