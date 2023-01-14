# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index : '/products' [GET]
- Show : '/products/:id' [GET] *you should pass product id*
- Create [token required] : '/products' [POST] *you should pass product info*


#### Users
- Index [token required] : '/users' [GET]
- Show [token required] : '/users/:id' [GET] *you should add user id*
- Create N[token required] : '/users' [POST] *you should pass user info*
- Auth (login) : '/users/auth' [POST] *you should pass login info*
- Delete [token required]: 'users/:id' [DELETE] *you should add user id*

#### Orders
- Current Order by user (args: user id)[token required] :'/orders/:user_id' [GET] *you should add user id*
- Index [token required] : '/orders' [GET]
- Create Order[token required] : '/orders' [POST] *you should pass order info*
- Add product to an order [token required] : '/orders/:id/products' [POST] *you should add order id and pass product info*
- Delete [token required]: '/order/:id' [DELETE] *you should add order id*

## Data Shapes
#### Product
-  id
- name
- price
       ###### Table "products"
        Column |         Type                         
        -------+-----------------------
        id     | integer               
        name   | character varying(25) 
        price  | integer               

#### User
- id
- firstName
- lastName
- password
       ###### Table "users"
         Column   |          Type                
        ----------+------------------------
        id        | integer                
        username  | character varying(100) 
        password  | character varying      
        firstname | character varying(255) 
        lastname  | character varying(255) 
#### Order 
- id
- user_id
- status of order (active or complete)
       ###### Table "orders"
        Column  |         Type                        
       ---------+-----------------------
       id       | integer              
       status   | character varying(15) 
       user_id  | bigint              

##### Product in order 
- id of the order
- id of each product in the order
- quantity of each product in the order
       ###### Table "order_products"
        Column     |  Type          
        -----------+---------
        id         | integer 
        quantity   | integer 
        order_id   | bigint   
        product_id | bigint   


