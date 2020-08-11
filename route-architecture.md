# Shirley Hastier / August 11, 2020 

## Shopping List HTTP route architecture

### Homepage
GET /

### About
GET /about

### Registration
POST /auth/register

### Login
GET /auth/login

### Logout
GET/auth/logout

### user home page
GET /auth/my-profile

### user profile
GET /auth/profile

### user dashboard
GET /auth/dashboard

- Will show all gategories

### user dashboard, see all items by category
GET /auth/dashboard/category/:id

### user add new item
POST/auth/items

### user see all 
GET/auth/items

### user edit an item
GET/auth/items/:id/edit

PUT/auth/items/:id

### user delete an item
DELETE/auth/items/:id