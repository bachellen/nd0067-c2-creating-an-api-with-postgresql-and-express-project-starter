import Client from "../database"

export type OrderdProduct = {
  product_id : number,
  order_id : number,
  quantity : number,
}
export type Order = {
    id? : number,
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


    async show (user_id: number): Promise<Order> {
        try {
          const sql = "SELECT * FROM orders WHERE user_id=($1)"
          const conn = await Client.connect()
          const result = await conn.query(sql, [user_id])
          const order = result.rows[0]
    
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not find order for user ${user_id}. ${err}`)
        }
      }

      async create(o: Order): Promise<Order> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
          // console.log(o.status,o.user_id)
    
          const result = await conn.query(sql, [o.status, o.user_id])
          const order = result.rows[0]

          conn.release()
    
          return order
        } catch(err) {
          throw new Error(`unable create order (${o}): ${err}`)
        } 
      }
      async delete(id: number): Promise<Order> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'Delete from orders where id = ($1) returning *'
          const productsql = 'Delete from order_products where order_id = ($1) returning *'
    
          const result = await conn.query(sql, [id])
          const order = result.rows[0]
          const result1 = await conn.query(productsql, [id])
          const products = result1

          conn.release()
    
          return order
        } catch(err) {
          throw new Error(`unable delete order (${id}): ${err}`)
        } 
      }
      async addProduct(quantity: number, order_id: number, product_id: number): Promise<OrderdProduct> {
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await Client.connect()
    
          const result = await conn
              .query(sql, [quantity, order_id, product_id])
    
          const product = result.rows[0]
    
          conn.release()
    
          return product
        } catch (err) {
          throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`)
        }
      }
      async removeProduct( order_id: number, product_id: number): Promise<OrderdProduct> {
        try {
          const sql = 'DELETE FROM order_products where order_id = ($1) AND product_id = ($2) RETURNING *'
          //@ts-ignore
          const conn = await Client.connect()
    
          const result = await conn
              .query(sql, [order_id, product_id])
    
          const products = result.rows[0]
    
          conn.release()
    
          return products
        } catch (err) {
          throw new Error(`Could not delete product ${product_id} from order ${order_id}: ${err}`)
        }
      }


}