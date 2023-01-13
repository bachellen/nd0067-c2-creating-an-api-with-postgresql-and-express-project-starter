import express , { Application, Request,Response } from "express";
import { Order,Orderstore } from "../models/orders";
import jwt from 'jsonwebtoken'

const {TOKEN_SECRET} = process.env

const store = new Orderstore()

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
    const orders = await store.index()
    res.json(orders)
} catch (error) {
    res.status(400)
    res.json({error})
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
        const order : Order = await store.show(id)
        res.json(order)
        // console.log(order)
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
            // console.log('hey')
            const newOrder = await store.create(order)
            res.json(newOrder)
         
        } catch(err) {
            res.status(400)
            res.json(err)
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
        const order_id: number = Number(_req.params.id)
        const product_id: number = Number(_req.body.product_id)
        const quantity: number = parseInt(_req.body.quantity)
      
        try {
          const addedProduct = await store.addProduct(quantity, order_id, product_id)
          res.json(addedProduct)
        } catch(err) {
          res.status(400)
          res.json(err)
        }
      } 
      const deleteOrder = async (_req:Request, res:Response) => {
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
            const orders : Order = await store.delete(id)
            res.json(orders)
        } catch (error) {
            res.status(400)
            res.json({ error })
        }
    
    }

export default function orderRoutes (app: Application) {
    app.get("/orders", index)
    app.get("/orders/:id", show)
    app.post('/orders', create)
    app.post('/orders/:id/products', addProduct)
    app.delete("/orders/:id", deleteOrder)
  }