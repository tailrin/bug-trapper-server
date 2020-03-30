# Bug Trapper

[Live App](https://bug-trapper-client.now.sh/)

This is a basic issue tracker for development.  Once you have created an account and signed in you are to add projects and then track issues for those projects.
Once an account has been created and you are logged in you have the ability to create projects. Once you have a project created you will be able to track issues on those projects. The issue allows you to update information on the issue and track whether or not it is resolved.


![Home Screen](/screenshots/home.png)
![Create Project Screen](/screenshots/addProject.png)
![Create Issue Screen](/screenshots/addIssue.png)
![Issue Screen](/screenshots/issue.png)

## Bug Trapper API info

### All endpoints except for '/api/users' and '/api/auth/login/' are protected endpoints and thus must have an 'Authorization' header

#### Create New User Endpoint

[https://bug-trapper-server.herokuapp.com/api/users](https://bug-trapper-server.herokuapp.com/api/users)

### Login Endpoint

[https://bug-trapper-server.herokuapp.com/api/auth/login](https://bug-trapper-server.herokuapp.com/api/auth/login)

### Add or Get Projects Enpoint

#### You can only retrieve projects associated with a particular user and thus must include the query paramater of user_id="your user id here" to get projects

[https://bug-trapper-server.herokuapp.com/projects](https://bug-trapper-server.herokuapp.com/projects)



### Add or Get Issue Endpoint

#### You can only retrieve issues associated with a particular user and thus must include the query paramater of user_id="your user id here" to get issues

[https://bug-trapper-server.herokuapp.com/issues](https://bug-trapper-server.herokuapp.com/issues)

### Update Issue Endpoint 

[https://bug-trapper-server.herokuapp.com/issues/:issue_id](https://bug-trapper-server.herokuapp.com/issues/:issue_id)


## Tech Stack Used

#### JavaScript <img src="/tech-logos/javascript.png" height="50px" width="50px" alt="javscript logo"/>

### React <img src="/tech-logos/react.png" height="50px" width="50px" alt="react logo"/>

### Css <img src="/tech-logos/css.png" height="50px" width="50px" alt="css logo"/>

### PostgreSQL <img src="/tech-logos/postgre.jpeg" height="50px" width="50px" alt="postgresql logo"/>

### Nodejs <img src="/tech-logos/node.png" height="50px" width="50px" alt="nodejs logo"/>