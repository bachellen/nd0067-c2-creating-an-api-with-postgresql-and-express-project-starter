import supertest from "supertest"
import jwt from "jsonwebtoken"
import { Order } from "../../models/orders"
import { User } from "../../models/users"
import app from "../../server"


const request = supertest(app)
const TOKEN_SECRET = process.env.TOKEN_SECRET 
let token : string
let user_id : number
let order_id : number

describe("Order Endpoint", () => {

    beforeAll(async () => {
        const userobj: User =  {
            username: "muhailah",
            password: "hellothisisme",
            firstname: "Bach",
            lastname: "Alsahali",
          }

    
        const {body: theToken} = await request.post("/users").send(userobj)
    
        token = theToken
    
        // @ts-ignore
        const {user} = jwt.verify(token, TOKEN_SECRET)
        user_id = Number(user.id)
        
      })
      afterAll(async () => {
        await request.delete(`/users/${user_id}`).set("Authorization", "bearer " + token)
      })
    
    const order : Order = {
        user_id : user_id,
        status : 'active'
    }

    it("should create order when accsesing create endpoint with right data", (done) => {

        request
        .post("/orders")
        .send(order)
        .set("Authorization", "bearer " + token)
        .then((res) => {
        const {body, status} = res
        order_id = Number(body.id)
        expect(status).toBe(200)
        done();
        })
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
    
    it("should delete an order", (done) =>{
        request.delete(`/orders/${order_id}`).set("Authorization", "bearer " + token)
        .then((res) => {
            expect(res.status).toBe(200)
            done()
          })
    })

})