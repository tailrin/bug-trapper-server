makeUsersArray = () => {
    return [
      {
        user_name: 'test-user-1',
        full_name: 'Test user 1',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        user_name: 'test-user-2',
        full_name: 'Test user 2',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        user_name: 'test-user-3',
        full_name: 'Test user 3',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        user_name: 'test-user-4',
        full_name: 'Test user 4',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
    ]
  }

makeProjectsArray = () => {
    return [
        {
            id: 1,
            user_id: 1,
            name: "test project 1",
            date_created: new Date().toISOString()
        },
        {
            id: 2,
            user_id: 2,
            name: "test project 2",
            date_created: new Date().toISOString()
        },
        {
            id: 3,
            user_id: 3,
            name: "test project 3",
            date_created: new Date().toISOString()
        },
        {
            id: 4,
            user_id: 4,
            name: "test project 4",
            date_created: new Date().toISOString()
        },
          
    ]
}

seedUsers = (db) => {
    const users = makeUsersArray();
    return db.transaction(async trx => {
        await trx.into('users').insert(users)
    })
}

module.exports = {
    seedUsers
}