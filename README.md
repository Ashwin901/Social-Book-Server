# Social Book
A platform to encourage people to help the ones in need.

---

## Setup Instructions
### Install
1.  git clone https://github.com/Ashwin901/DOMS-Backend.git
```
### Configure
Create a .env file in the root folder with following contents.
```
<ul>
    <li>PORT="Enter the port number here"</li>
    <li>MONGODB_URI="Enter MongoDB URI"</li>
    <li>SECRET="Add any random string here"</li>
    <li>STRIPE_API_KEY="Add the stripe key here"</li>
</ul>
```

### Run
1.In the root of the folder run `npm install`
2.Install `nodemon` and then run `npm run dev`

---

## Deployments


---

## Project Structure

```
├── controllers
│   ├── auth 
│   ├── donation
│   ├── organisation
│   ├── post 
│   ├── user 
│   └── visits 
├── middleware
│   ├── request_logger
│   └── verify_tokens 
├── models
│   ├── donation
│   ├── organisation
│   ├── post
│   ├── user
│   └── visit
├── services
│   ├── authentication
│   └── database
├── app.js
├── config.js
├── server.js
├── .env
├── .gitignore
└── README.md
```
