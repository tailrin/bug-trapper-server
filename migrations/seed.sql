BEGIN;

INSERT INTO projects (user_id, name, date_created)
VALUES
    (1, 'Ars Technica', now()),
    (1, 'Desperation', now()),
    (1, 'Reek', now());

INSERT INTO issues (project_id, date_created, date_modified, status, description, user_id)
VALUES
    (1, now() - '2 days'::INTERVAL, now() - '1 day'::INTERVAL, 'Active', 'cannot login', 1),
    (1, now() - '2 days'::INTERVAL, now() - '1 day'::INTERVAL, 'Active', 'unable to logout', 1),
    (3, now() - '2 days'::INTERVAL, now() - '1 day'::INTERVAL, 'Active', 'cannot create new project', 1),
    (2, now() - '2 days'::INTERVAL, now() - '1 day'::INTERVAL, 'Active', 'cannot update issue', 1);

INSERT INTO issue_notes(issue_id, date_created, content)
VALUES
    (3, now() - '2 days'::INTERVAL, 'missing ; on line 29 of app.js'),
    (2, now() - '2 days'::INTERVAL, 'undefined variable on line 13 of app.js'),
    (1, now() - '2 days'::INTERVAL, 'missing closing } on line 75 of app.js');

COMMIT;

