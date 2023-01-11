import Client from "../database"


export type Order = {
    status : string,
    user_id: number,
}

export class Orderstore {

  async index (): Promise<Order[]> {
    try {
      const conn = await Client.connect()
      const sql = "SELECT * FROM orders"

      const {rows} = await conn.query(sql)

      conn.release()

      return rows
    } catch (err) {
      throw new Error(`Could not get orders. ${err}`)
    }
  }


    async show (id: number): Promise<Order> {
        try {
          const sql = "SELECT * FROM orders WHERE id=($1)"
          const conn = await Client.connect()
          const result = await conn.query(sql, [id])
          const order = result.rows[0]
    
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not find order ${id}. ${err}`)
        }
      }

      async create(o: Order): Promise<Order> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
    
    
          const result = await conn.query(sql, [o.status, o.user_id])
          const order = result.rows[0]

          conn.release()
    
          return order
        } catch(err) {
          throw new Error(`unable create order (${o}): ${err}`)
        } 
      }
    
      async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await Client.connect()
    
          const result = await conn
              .query(sql, [quantity, orderId, productId])
    
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
      }


}