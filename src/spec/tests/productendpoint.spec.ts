import supertest from "supertest"
import jwt from "jsonwebtoken"
import { User } from "../../models/users"
import { Product } from "../../models/products"
import app from "../../server"

const request = supertest(app)
const TOKEN_SECRET = process.env.TOKEN_SECRET 
let token : string
let user_id : number

describe("Product Endpoint", () => {

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
    
    const product : Product = {
        name : 'Cookie',
        price : 10,
    }

    it("should create order when accsesing create endpoint with right data", (done) => {

        request
        .post("/products")
        .send(product)
        .set("Authorization", "bearer " + token)
        .then((res) => {
        const {body, status} = res
       
        expect(status).toBe(200)
        done();
        })
      })

    it("should succsess when get all products (index)", (done) => {
        request
        .get("/products")
        .set("Authorization", "bearer " + token)
        .then((res) => {
          expect(res.status).toBe(200)
          done()
        })
      })

})