import { Order, Orderstore } from "../../models/orders";
import { Product, Productstore } from "../../models/products";
import { User,Userstore } from "../../models/users";

const store = new Orderstore()
const userstore = new Userstore()
const productstore = new Productstore()
let user_id: number, product_id: number, order_id : number
describe("Order Model",()=>{

    beforeAll(async () => {
        const user: User = await userstore.create({
          username: "muhailah",
          password: "hellothisisme",
          firstname: "Bach",
          lastname: "Alsahali",
        })
    user_id = Number(user.id)

    const product: Product = await productstore.create({
        name: "Lunch box",
        price: 15
      })
      product_id = Number(product.id)
        }
    )
    afterAll(async () => {
      await store.delete(order_id)
      await userstore.delete(user_id)
      await productstore.delete(product_id)
    })
  
    it("should have an index method", () => {
        expect(store.index).toBeDefined()
      })
    
    it("should have a show method", () => {
        expect(store.show).toBeDefined()
      })
    
    it("should have a add method", () => {
        expect(store.create).toBeDefined()
      })
    
    it("should have a delete method", () => {
        expect(store.delete).toBeDefined()
      })

    it('fetch all orders', async function () {
        const order = {status: 'active', user_id: user_id }
        const newOrder: Order = await store.create(order)
        const orders = await store.index()
       expect(orders.length).toBeGreaterThan(0);
       await store.delete(Number(newOrder.id))
    });
    it('fetch certian order', async function () {
      const user: User = await userstore.create({
        username: "jweeej",
        password: "abrakadbra",
        firstname: "Jawaher",
        lastname: "alanezi",
      })
      const id = Number(user.id)
      const order = {status: 'active', user_id: id }
      const newOrder: Order = await store.create(order)
      const orderobj : Order = await store.show(id)
      expect(orderobj).toEqual(newOrder)
      await store.delete(Number(orderobj.id))
      await userstore.delete(id)
  });
    it("create method should create an order", async () => {
        const order = {status: 'active', user_id: user_id }
        const newOrder: Order = await store.create(order)
        const expected = {
          status: newOrder.status,
          user_id: Number(newOrder.user_id)
        } 
        expect(expected).toEqual(order)
        await store.delete(Number(newOrder.id))
      })
      it("add method should add a product to an order", async () => {
        const user: User = await userstore.create({
          username: "nooni",
          password: "hello",
          firstname: "Nouf",
          lastname: "aljahani",
        })
        const id = Number(user.id)
        const order = {status: 'active', user_id: id }
        const newOrder: Order = await store.create(order)

        const theproduct  = {
          quantity :2,
          order_id : Number(newOrder.id),
          product_id : product_id
        }
        const newproduct = await store.addProduct(2,Number(newOrder.id),product_id)
        const expected = {
          quantity :  newproduct.quantity,
          order_id : Number(newproduct.order_id),
          product_id : Number(newproduct.product_id)
        }
        order_id = Number(newproduct.order_id)
        expect(expected).toEqual(theproduct)
        await store.removeProduct(Number(newproduct.order_id),Number(newproduct.product_id))
       
      })


})