import dotenv from 'dotenv'
import {ClientConfig,  Pool } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env

let config : ClientConfig
console.log(ENV)

if(ENV === 'test') {
 config  = {
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  }
} else
 {
  config  = {
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  }
}

export default new Pool(config)