# Storefront Backend Project

## Install Dependencies 
Please fork this repo and run the following command at the root directory to install all packages.
`yarn` or `npm install`

## Set up Database

You should be ready with creating dev and test databses.
connect to the default postgres database as the server's root user `psql -U postgres`
In psql run the following to create a dev user and test user

`CREATE USER dev WITH PASSWORD 'password123'`;

`CREATE USER test WITH PASSWORD 'password123'`;


In psql run the following to create the dev and test database

`CREATE DATABASE storefront;`

`CREATE DATABASE storefront_test;`

Connect to the databases and grant all privileges
Grant for dev database

`\c storefront`

`GRANT ALL PRIVILEGES ON DATABASE storefront TO dev;`

Grant for test database

`\c storefront_test`

`GRANT ALL PRIVILEGES ON DATABASE storefront_test TO test;`


### Run migrations 

To run the migrations just run the following command 
`db-migrate up`
To undo the migrations run the follosing command 
`db-migrate down`

## .ENV file set up 

```
POSTGRES_HOST=your_ip

DB_PORT= 5432

POSTGRES_DB=your_dtatabase_name

POSTGRES_DB_TEST=your_test_dtatabase_name

POSTGRES_USER=your_database_user_name

POSTGRES_PASSWORD=your_database_password

ENV=dev

BCRYPT_PASSWORD=your_bcrypt_passowrd

SALT_ROUNDS=11

TOKEN_SECRET=your_token_secret
```

```

## Run the project 

To run the project you can run the following command
`yarn start` or `npm start`
