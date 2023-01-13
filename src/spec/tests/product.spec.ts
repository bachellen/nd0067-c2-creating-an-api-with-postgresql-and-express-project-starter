import { Product, Productstore } from "../../models/products"
const store = new Productstore()

describe("Product Model",()=>{

    const product: Product =  {
       price: 20,
       name : "Spoon",
      }
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

      it("create method should create a product", async () => {
        const newProduct = await store.create(product)
        const expected = {
        price: newProduct.price,
        name: newProduct.name,
        }
        expect(expected).toEqual(product)
        await store.delete(Number(newProduct.id))
      })

})

