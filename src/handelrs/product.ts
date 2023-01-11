import express , { Application, Request,Response } from "express";
import { Product, Productstore } from "../models/products";
import jwt from 'jsonwebtoken'

const {TOKEN_SECRET} = process.env

const store = new Productstore()

const index =async (_req:Request, res:Response) => {
    // try {
    //     console.log("hala")
    //     const authorizationHeader = _req.headers.authorization
    //     const token = authorizationHeader!.split(' ')[1]
    //     jwt.verify(token, TOKEN_SECRET!)
    // } catch (error) {
    //     res.status(401)
    //     res.json('Access denied, invalid token')
    //     return
    // }
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
    // try {
    //     const authorizationHeader = _req.headers.authorization
    //     const token = authorizationHeader!.split(' ')[1]
    //     jwt.verify(token, TOKEN_SECRET!)
    // } catch (error) {
    //     res.status(401)
    //     res.json('Access denied, invalid token')
    //     return
    // }
    
    try {
        const id = _req.params.id as unknown as number

        if (id === undefined) {
            res.status(400)
            res.send("Missing required parameter :id.")
            return false
          }

        console.log(id)
        const product : Product = await store.show(id)
        res.json(product)
        console.log(product)
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

        const product: Product = {
            name : _req.body.name,
            price: _req.body.price,
        }
        try {
            console.log('hey')
            const newProduct = await store.create(product)
            res.json(product)
         
        } catch(err) {
            res.status(400)
            res.json(err as string + product)
        }      
    }
   

export default function productRoutes (app: Application) {
    app.get("/products", index)
    app.get("/products/:id", show)
    app.post('/products', create)

  }