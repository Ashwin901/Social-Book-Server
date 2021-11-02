# Social Book Server
A platform to encourage people to help the ones in need.

---

## Setup Instructions
### Install
```
1.  git clone https://github.com/Ashwin901/DOMS-Backend.git
```
### Configure
```
Create a .env file in the root folder with following contents.

PORT="Port number"
MONGODB_URI="MongoDB URI"
SECRET="Any random string here"
STRIPE_API_KEY="Stripe key here"
USER_EMAIL="Email address from which verification email will be sent"
USER_PASSWORD="User password for the above email address"
CLIENT_URL="URL of the client side of the application"
```

### Run
```
1.In the root of the folder run  "npm install"
2.Install `nodemon` and then run "npm run dev"
```
---

## Deployments

### Heroku
1. Install heroku cli and login
2. Run `heroku create`
3. If you are hosting the docker container run `heroku stack:set container`
4. Push the desired branch `git push heroku <branch>:main`

### Running docker container
1. Build image using `docker build .`
2. Run container using `docker run -p 5000:5000 <image-name>`
3. If you want to use a mongo db container instead of cloud mongo database run `docker-compose up -d` (Don't forget to change the Mongo db URI in .env file)

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
