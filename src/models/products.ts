import Client from "../database"


export type Product = {
    name : string,
    price: number,
}

export class Productstore {

    async index (): Promise<Product[]> {
        try {
          const conn = await Client.connect()
          const sql = "SELECT * FROM products"
    
          const {rows} = await conn.query(sql)
    
          conn.release()
    
          return rows
        } catch (err) {
          throw new Error(`Could not get products. ${err}`)
        }
      }

      async show (id: number): Promise<Product> {
        try {
          const sql = "SELECT * FROM products WHERE id=($1)"
          const conn = await Client.connect()
          const result = await conn.query(sql, [id])
          const order = result.rows[0]
    
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not find products ${id}. ${err}`)
        }
      }
      
      async create(p: Product): Promise<Product> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
    
    
          const result = await conn.query(sql, [p.name, p.price])
          const product = result.rows[0]
    
          conn.release()
    
          return product
        } catch(err) {
          throw new Error(`unable create product (${p.name}): ${err}`)
        } 
      }





}