import supertest from "supertest"
import jwt from "jsonwebtoken"
import { Order } from "../../models/orders"
import { User } from "../../models/users"
import { Product } from "../../models/products"
import app from "../../server"


const request = supertest(app)
const TOKEN_SECRET = process.env.TOKEN_SECRET 
let token : string
let user_id : number
let order_id : number
let product_id :number

describe("Order Endpoint", () => {
 

    beforeAll(async () => {
        const userobj: User =  {
            username: "muhailah",
            password: "hellothisisme",
            firstname: "Bach",
            lastname: "Alsahali",
          }

        const product : Product = {
          name: 'Lunch box',
          price : 15
        }

    
        const {body: theToken} = await request.post("/users").send(userobj)
        
        token = theToken
        
        // @ts-ignore
        const {user} = jwt.verify(token, TOKEN_SECRET)
        user_id = Number(user.id)
        const {body: productobj} = await request.post("/products").send(product).set("Authorization", "bearer " + token)
        product_id = Number(productobj.id)
      const border : Order = {
          user_id : user_id,
          status : 'active'
      }
      const {body: orderobj} = await request.post("/orders").send(border).set("Authorization", "bearer " + token)
     order_id = Number(orderobj.id)
      })
      afterAll(async () => {
        await request.delete(`/users/${user_id}`).set("Authorization", "bearer " + token)
      })
      const order : Order = {
        user_id : user_id,
        status : 'active'
    }
    
    it("should create order when accsesing create endpoint with right data", (done) => {
      let id : number | undefined;
        request
        .post("/orders")
        .send(order)
        .set("Authorization", "bearer " + token)
        .then((res) => {
        const {body, status} = res
        id = Number(body.id)
        expect(status).toBe(200)
        done();
        })
        if (id !== undefined){
         request.delete(`/orders/${id}`).set("Authorization", "bearer " + token).then((res)=>{
          const {body, status} = res
         })
        }
      })

    it("should succsess when get all orders (index)", (done) => {
        request
        .get("/orders")
        .set("Authorization", "bearer " + token)
        .then((res) => {
          expect(res.status).toBe(200)
          done()
        })
      })
    
    it("should succsess when get current orders for a the user", (done) => {
      request
      .get(`/orders/${user_id}`)
      .set("Authorization", "bearer " + token)
      .then((res) => {
        expect(res.status).toBe(200)

        done()
      })
    })
    it("should add product to an specified order when accsesing add endpoint with right data", (done) => {
      const addedproduct = {
        product_id : product_id,
        quantity : 3
      }

      request
      .post(`/orders/${order_id}/products`)
      .send(addedproduct)
      .set("Authorization", "bearer " + token)
      .then((res) => {
      const {body, status} = res

      expect(status).toBe(200)
      done();
      })
    })

    it("should delete an order", (done) =>{
      request.delete(`/orders/${order_id}`).set("Authorization", "bearer " + token)
      .then((res) => {
          expect(res.status).toBe(200)
          done()
        })
  })

})