REST SERVER for Ionic2

# Installation 

```
$ git clone https://github.com/siteslave/chiangmai-server.git
$ cd chiangmai-server
$ npm i
```
สร้างไฟล์ .env

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=api_demo
DB_USER=demo
DB_PASSWORD=demo
```

รัน server

```
$ npm start
or
$ nodemon bin/www
```

# Routing

```
GET       /customers
GET       /customers/search/:query
GET       /customers/detail/:customerId
GET       /customers/groups
DELETE    /customers/:customerId
POST      /customers [firstName, lastName, sex, customerTypeId, telephone, email, image]
PUT       /customers [firstName, lastName, sex, customerTypeId, telephone, email, image, customerId]
POST      /customers/save-map [customerId, lat, lng]
GET       /customers/get-map/:customerId

POST      /fcm/register-device [deviceToken]
GET       /fcm/cancel-accept
GET       /fcm/users-list
GET       /fcm/accept-status
POST      /fcm/send-message [message]

POST      /users/login [username, password]

```
