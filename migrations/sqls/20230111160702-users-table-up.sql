CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    password VARCHAR,
    firstName varchar(255),
    lastName varchar(255)
);