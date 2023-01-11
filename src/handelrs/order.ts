import express , { Application, Request,Response } from "express";
import { Order,Orderstore } from "../models/orders";
import jwt from 'jsonwebtoken'

const {TOKEN_SECRET} = process.env

const store = new Orderstore()

const index =async (_req:Request, res:Response) => {
    try {
        console.log("hala")
        const authorizationHeader = _req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        jwt.verify(token, TOKEN_SECRET!)
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
try {
    const orders = await store.index()
    res.json(orders)
} catch (error) {
    res.status(400)
    res.json({error})
}
}    

const show = async (_req:Request, res:Response) => {
    console.log("wlaah")
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

        console.log(id)
        const order : Order = await store.show(id)
        res.json(order)
        console.log(order)
    } catch (error) {
        res.status(400)
        res.json({ error })
    }
    }

    const create = async (_req: Request, res: Response) => {
        try {
            const authorizationHeader = _req.headers.authorization
            const token = authorizationHeader!.split(' ')[1]
            jwt.verify(token, TOKEN_SECRET!)
        } catch (error) {
            res.status(401)
            res.json('Access denied, invalid token')
            return
        }
        const order: Order = {
            status : _req.body.status,
            user_id: _req.body.user_id,
        }
        try {
            console.log('hey')
            const newOrder = await store.create(order)
            res.json(order)
         
        } catch(err) {
            res.status(400)
            res.json(err as string + order)
        }      
    }
    const addProduct = async (_req: Request, res: Response) => {
        try {
            const authorizationHeader = _req.headers.authorization
            const token = authorizationHeader!.split(' ')[1]
            jwt.verify(token, TOKEN_SECRET!)
        } catch (error) {
            res.status(401)
            res.json('Access denied, invalid token')
            return
        }
        const orderId: string = _req.params.id
        const productId: string = _req.body.productId
        const quantity: number = parseInt(_req.body.quantity)
      
        try {
          const addedProduct = await store.addProduct(quantity, orderId, productId)
          res.json(addedProduct)
        } catch(err) {
          res.status(400)
          res.json(err)
        }
      } 


export default function orderRoutes (app: Application) {
    app.get("/orders", index)
    app.get("/orders/:id", show)
    app.post('/orders', create)
    app.post('/orders/:id/products', addProduct)
  }