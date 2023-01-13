import bcrypt from "bcrypt"
import Client from "../database"

const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env

export type User = {
    id? : number,
    username : string,
    password : string,
    firstname : string,
    lastname : string,
}

export class Userstore {
  
    async index (): Promise<User[]> {
        try {
          const conn = await Client.connect()
          const sql = "SELECT * FROM users"
    
          const {rows} = await conn.query(sql)
    
          conn.release()
    
          return rows
        } catch (err) {
          throw new Error(`Could not get users. ${err}`)
        }
      }

    async create(u: User): Promise<User> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'INSERT INTO users (username, password,firstName,lastName) VALUES($1, $2,$3,$4) RETURNING *'
    
          const hash = bcrypt.hashSync(
            u.password + BCRYPT_PASSWORD, 
            parseInt(SALT_ROUNDS as string)
          );
    
          const result = await conn.query(sql, [u.username, hash,u.firstname,u.lastname])
          const user = result.rows[0]
    
          conn.release()
    
          return user
        } catch(err) {
          throw new Error(`unable create user (${u.username}): ${err}`)
        } 
      }

      async show (id: number): Promise<User> {
        try {
          const sql = "SELECT * FROM users WHERE id=($1)"
          const conn = await Client.connect()
          const result = await conn.query(sql, [id])
    
          conn.release()
          return result.rows[0]
        } catch (err) {
          throw new Error(`Could not find user ${id}. ${err}`)
        }
      }

      async delete (id : number): Promise<User> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'Delete from users where id = ($1) returning *'
      
          const result = await conn.query(sql, [id])
          const user = result.rows[0]
      
          conn.release()
      
          return user
        } catch(err) {
          throw new Error(`unable delete user (${id}): ${err}`)
        } 
        }
      

      async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await Client.connect()
        const sql = 'SELECT password FROM users WHERE username=($1)'
    
        const result = await conn.query(sql, [username])
    
        // console.log(password+BCRYPT_PASSWORD)
    
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          // console.log(user)
    
          if (bcrypt.compareSync(password+BCRYPT_PASSWORD, user.password)) {
            return user
          }
        }
    
        return null
      }
}