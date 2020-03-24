DROP TABLE IF EXISTS issue_notes;
DROP TABLE IF EXISTS issues;
DROP TYPE IF EXISTS working;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;

CREATE TYPE working AS ENUM(
    'Active',
    'Closed'
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    password TEXT NOT NULL,
    date_created TIMESTAMP NOT NULL DEFAULT now(),
    date_modified TIMESTAMP DEFAULT now()
);

CREATE TABLE projects(
    id SERIAL PRIMARY KEY,
    user_id INTEGER
        REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    date_created TIMESTAMP NOT NULL
);

CREATE TABLE issues(
    id SERIAL PRIMARY KEY,
    project_id INTEGER 
        REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER 
        REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    date_created TIMESTAMP NOT NULL,
    date_modified TIMESTAMP NOT NULL,
    description TEXT NOT NULL,
    status working NOT NULL
);

CREATE TABLE issue_notes(
    id SERIAL PRIMARY KEY,
    issue_id INTEGER
        REFERENCES issues(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    date_created TIMESTAMP NOT NULL
);

