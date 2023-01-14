import supertest from "supertest"
import jwt from "jsonwebtoken"
import { User } from "../../models/users"
import app from "../../server"

const request = supertest(app)
const TOKEN_SECRET = process.env.TOKEN_SECRET 
let token : string
let user_id : number

describe("User Endpoint", () => {

    const user: User =  {
        username: "muhailah",
        password: "hellothisisme",
        firstname: "Bach",
        lastname: "Alsahali",
      }

      beforeAll(async () => {
        const userobj: User =  {
            username: "bach",
            password: "iamamazing",
            firstname: "Muhailah",
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
    it("should require authorization on every endpoint", (done) => {
        request
        .get("/users")
        .then((res) => {
          expect(res.status).toBe(401)
          done()
        })

        request
        .get(`/users/${user_id}}`)
        .then((res) => {
          expect(res.status).toBe(401)
          done();
        })
        
        request
        .delete(`/users/${user_id}`)
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
        // token = body
        // user_id = Number(body.id)
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

      it("should succsess when get specified user (show)", (done) => {
        // console.log(token)
        request
        .get(`/users/${user_id}`)
        .set("Authorization", "bearer " + token)
        .then((res) => {
            
          expect(res.status).toBe(200)
          done()
        })
      })

      it("should succsess when user login with correct login information (auth)", (done) => {
        // console.log(token)
        const loggininfo ={
          username : user.username,
          password : user.password
        }
        request
        .post("/users/auth")
        .send(loggininfo)
        .then((res) => {
            
          expect(res.status).toBe(200)
          done()
        })
      })
      
})