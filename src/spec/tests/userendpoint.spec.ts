import supertest from "supertest"
import jwt from "jsonwebtoken"
import { User } from "../../models/users"
import app from "../../server"

const request = supertest(app)
const TOKEN_SECRET = process.env.TOKEN_SECRET 
let token : string

describe("User Endpoint", () => {

    const user: User =  {
        username: "muhailah",
        password: "hellothisisme",
        firstname: "Bach",
        lastname: "Alsahali",
      }
    it("should require authorization on every endpoint", (done) => {
        request
        .get("/users")
        .then((res) => {
          expect(res.status).toBe(401)
          done()
        })

        request
        .get(`/users/${1}`)
        .then((res) => {
          expect(res.status).toBe(401)
          done();
        })
        
        request
        .delete(`/users/${1}`)
        .then((res) => {
          expect(res.status).toBe(401)
          done();
        })
    })

    it("should create user when accsesing create endpoint with right data", (done) => {
        request
        .post("/users")
        .send(user)
        .then((res) => {
        const {body, status} = res
        token = body
       
        expect(status).toBe(200)
        done();
        })
      })

    it("should succsess when get all users (index)", (done) => {
        // console.log(token)
        request
        .get("/users")
        .set("Authorization", "bearer " + token)
        .then((res) => {
            
          expect(res.status).toBe(200)
          done()
        })
      })

})