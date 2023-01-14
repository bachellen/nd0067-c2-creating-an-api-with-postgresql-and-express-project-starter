import { User,Userstore } from "../../models/users";
import bcrypt from "bcrypt"
const store = new Userstore()
const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env
describe("User Model",()=>{

    const user: User =  {
        username: "muhailah",
        password: "hellothisisme",
        firstname: "Bach",
        lastname: "Alsahali",
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

      it("create method should create a user", async () => {
        const newUser = await store.create(user)
        
        const compareUser =  {
            username: user.username,
            firstname: user.firstname,
            lastname:  user.lastname , 
        }
        const expected = {
        username: newUser.username,
        firstname: newUser.firstname,
        lastname:  newUser.lastname ,
        }
        expect(expected).toEqual(compareUser)
        await store.delete(Number(newUser.id))
      })
      it('fetch all users', async function () {
        const newUser = await store.create(user)
        const users = await store.index()
       expect(users.length).toBeGreaterThan(0);
       await store.delete(Number(newUser.id))
    });
    it('fetch certian user', async function () {
      const newUser = await store.create(user)
      const userobj = await store.show(Number(newUser.id))
      expect(userobj).toEqual(newUser)
      await store.delete(Number(userobj.id))
  });
})

