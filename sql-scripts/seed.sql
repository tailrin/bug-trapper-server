BEGIN;

INSERT INTO users (user_name, credentials)
VALUES
    ('John', '$2a$16$HduZ2iKeJmDgoTXE1GbB.eeb85tI4Z6EX3o2/aZkZGxRv1BNF3wku');

INSERT INTO projects (user_id, name, date_created)
VALUES
    (1, 'Ars Technica', now()),
    (1, 'Desperation', now()),
    (1, 'Reek', now());

INSERT INTO issues (project_id, date_created, date_modified, status, description)
VALUES
    (1, now() - '2 days'::INTERVAL, now() - '1 day'::INTERVAL, 'Active', 'cannot login'),
    (1, now() - '2 days'::INTERVAL, now() - '1 day'::INTERVAL, 'Active', 'unable to logout'),
    (3, now() - '2 days'::INTERVAL, now() - '1 day'::INTERVAL, 'Active', 'cannot create new project'),
    (2, now() - '2 days'::INTERVAL, now() - '1 day'::INTERVAL, 'Active', 'cannot update issue');

COMMIT;

