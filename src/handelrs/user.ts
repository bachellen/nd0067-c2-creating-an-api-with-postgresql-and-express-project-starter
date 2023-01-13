import express , { Application, Request,Response } from "express";
import { User,Userstore } from "../models/users";
import jwt from 'jsonwebtoken'

const {TOKEN_SECRET} = process.env

const store = new Userstore()

const index =async (_req:Request, res:Response) => {
try {
    // console.log("hala")
    const authorizationHeader = _req.headers.authorization
    const token = authorizationHeader!.split(' ')[1]
    jwt.verify(token, TOKEN_SECRET!)
} catch (error) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
}

try {
    const users = await store.index()
    res.json(users)
} catch (error) {
    res.status(400)
    res.json({ error })
}
}

const authenticate = async (_req: Request, res: Response) => {
    const user: User = {
      username: _req.body.username,
      password: _req.body.password,
      firstname: _req.body.firstName,
      lastname: _req.body.lastName,
    }
    try {
        const u = await store.authenticate(user.username, user.password)
        var token = jwt.sign({ user: u }, TOKEN_SECRET!);
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }

const create = async (_req: Request, res: Response) => {
    const user: User = {
        username: _req.body.username,
        password: _req.body.password,
        firstname: _req.body.firstname,
        lastname: _req.body.lastname,
    }
    try {
        // console.log('hey')
        const newUser = await store.create(user)
        
        var token = jwt.sign({ user: newUser }, TOKEN_SECRET!);
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err as string + user)
    }      
}

const deleteuser = async (_req:Request, res:Response) => {
    try {
        const authorizationHeader = _req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        jwt.verify(token, TOKEN_SECRET!)
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    
    try {
        const id = _req.params.id as unknown as number

        if (id === undefined) {
            res.status(400)
            res.send("Missing required parameter :id.")
            return false
          }

        // console.log(id)
        const user : User = await store.delete(id)
        res.json(user)
        // console.log(user)
    } catch (error) {
        res.status(400)
        res.json({ error })
    }

}

const show = async (_req:Request, res:Response) => {
    // console.log("wlaah")
    try {
        const authorizationHeader = _req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        jwt.verify(token, TOKEN_SECRET!)
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    
    try {
        const id = _req.params.id as unknown as number

        if (id === undefined) {
            res.status(400)
            res.send("Missing required parameter :id.")
            return false
          }

        // console.log(id)
        const user : User = await store.show(id)
        res.json(user)
        // console.log(user)
    } catch (error) {
        res.status(400)
        res.json({ error })
    }
}

export default function userRoutes (app: Application) {
    app.get("/users", index)
    app.post("/users", create)
    app.get("/users/:id", show)
    app.post("/users/auth", authenticate)
    app.delete("/users/:id", deleteuser)
}

