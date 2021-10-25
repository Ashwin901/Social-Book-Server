# DOMS-Backend

### Project Set Up

1.  git clone https://github.com/Ashwin901/DOMS-Backend.git
2.  In the root of the folder run `npm install`
3.  Create .env folder in the root of the project
    <ul>
        <li>PORT="Enter the port number here"</li>
        <li>MONGODB_URI="Enter MongoDB URI"</li>
        <li>SECRET="Add any random string here"</li>
        <li>STRIPE_API_KEY="Add the stripe key here"</li>
    </ul>
4.  Install `nodemon` and then run `npm run dev`

### Project Working

1. In the main folder we have the app.js, config.js and server.js files. 
   The app.js file describes all the routes. The config.js file support 
   multiple configuration files using NODE_ENV. We also have 
   controllers, middleware, services and models.
2. In the controllers folder we have files which handle users' requests and return responses for different routes.
    * hsr
