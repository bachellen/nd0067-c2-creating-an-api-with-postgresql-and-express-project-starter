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

    it('fetch all orders', async function () {
        const newProduct: Product = await store.create(product)
        const products = await store.index()
       expect(products.length).toBeGreaterThan(0);
       await store.delete(Number(newProduct.id))
    });
    it('fetch certian order', async function () {
      const newProduct: Product = await store.create(product)
      const productsobj = await store.show(Number(newProduct.id))
      expect(productsobj).toEqual(newProduct)
      await store.delete(Number(productsobj.id))
  });
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

