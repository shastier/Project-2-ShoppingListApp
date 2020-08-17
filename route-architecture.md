# Shirley Hastier / August 16, 2020 

## Shopping List HTTP route architecture

### Homepage
GET /

### About
GET /about

### Registration
POST /user/new

### Login
GET /auth/login

### Logout
GET/auth/logout

### see all items
GET/items/

### user home page
GET /user/

### see user cart items
GET /cart/show

### user add new item
POST/cart

### user edit an item
GET/items/:id/edit

PUT/items/:id

### user delete an item
DELETE/cart/show/:id