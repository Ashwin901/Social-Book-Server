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

1. In the main folder we have the app.js, config.js and server.js files. The app.js file describes
   all the routes. The config.js file support  multiple configuration files using NODE_ENV. We also 
   have controllers, middleware, services and models.
2. In the controllers folder we have files which handle users' requests and return responses for different routes.
    * In the auth_controller file we have functions for register and login (for both users and organisation). 
      In the register function we receive all the details filled by the user. Then we create a record using the data.
      If there was some error in registration (for e.g. email already in use) we report the error. Otherwise we 
      generate tokens and return the response.
    * In the organisation_controller file we have function which can fetch all the organisations, search for an 
      organisation by id. We can also update the details for a particular organisation. We also have a function 
      to retrieve all the posts for a particular organisation. In case of any errors we report it.
    * In the post_controller file we have functions to create new posts, fetch all the posts and fetch a 
      particular post as well. In case of any error we report the error.
    * In the user_controller file we have functions to find the user with given id. We also have the option 
      to update the user details. If the user does not exist then we return error message.
    * In the visits_controllers file we have functions for creating new visits, update visit details 
      (If the visit does not exist then we return error message), fetch details of a particular visit,
      delete visits, fetch the visits of a particular user/organisation.    
 3.   In the middlewares folder we have the verify_tokens file which is used to verify tokens while the user is 
      trying to perform actions which require authentication.
 4. In the models folder we define the schema for user, organisation, visit, post and donations.
