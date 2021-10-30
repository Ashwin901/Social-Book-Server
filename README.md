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

#### 1. Visits
    i.Creating New Visits:
      * Entry Point: "/"
      * Action: Receive data from the front end and create a record in the visits database.
      * Response: If error send status code 500. Otherwise send response with status code 200.
    ii.Update Visit:
      * Entry Point: "/:id"
      * Action: Receive data from the front end and check if visit is present in the database. If not then send status codde 404. If present then update the data.
      * Response: If error send status code 500. Otherwise send response with status code 200.
    iii.Get Details of a Visit:
      * Entry Point: "/:id"
      * Action: Receive id from the front end and retrieve data.
      * Response: If error send status code 500. Otherwise send response with status code 200.
    iv.Delete a Visit:
      * Entry Point: "/:id"
      * Action: Receive id from the front end and delete entry.
      * Response: If error send status code 500. Otherwise send response with status code 200.
    v.Get all the visits of a User:
      * Entry Point: "/user/:id"
      * Action: Receive user id from the front end and find all the visits.
      * Response: If error send status code 500. Otherwise send response with status code 200.
    vi.Get all the visits of a Organisation:
      * Entry Point: "/org/:id"
      * Action: Receive org id from the front end and find all the visits.
      * Response: If error send status code 500. Otherwise send response with status code 200.
    vii.Get name of Organisations:
      * Entry Point: "/name/org"
      * Action: Retrieve all the names from the database.
      * Response: If error send status code 500. Otherwise send response with status code 200.

#### 2. Posts
    i.Create Posts:
      * Entry Point: "/"
      * Receive data from the front-end and create a record in the database.
      * Response: If error send status code 500. Otherwise send response with status code 200.
    ii.Find all the Posts:
      * Entry Point: "/"
      * Retrieve all the posts from the database.
      * Response: If error send status code 500. Otherwise send response with status code 200.
    iii.Find Post by id:
      * Entry Point: "/:id"
      * Receive id from the front-end and find post.
      * Response: If error send status code 500. Otherwise send response with status code 200.

#### 3. Donation
    Third Party Service used for payments: Stripe
    i. Perform Payment:
      * Entry Point: "/charge"
      * Action: Receive the credit card token from the stripe frontend. Process the Payment and return the generated message.
      * Response: If error send status code 500. Otherwise send response with status code 200.
    ii. Save Payment:
      * Entry Point: "/save"
      * Action: After successful payment save the payment info in the database.
      * Response: If error send status code 500. Otherwise send response with status code 200.
    iii. Get donations of a user:
      * Entry Point: "/user/:id"
      * Action: Receive user id from the frontend and find donations by the user.
      * Response: If error send status code 500. Otherwise send response with status code 200.
    iv. Get donations for an Organisation:
      * Entry Point: "/org/:id"
      * Action: Receive org id from the frontend and find donations for the organisation.
      * Response: If error send status code 500. Otherwise send response with status code 200.

#### 4. Authentication
    bcryptjs library used for hashing password
    i.Organisation Register: 
      * Entry Point: "/org/register"
      * Action: Recieve data from front-end and then hash the password using bcryptjs.
        Create record in Organisation database.
      * Response: If error, then send res status code 500. Otherwise generate token and send res status code 200.
    ii.Organisation Login: 
      * Entry Point: "/org/login"
      * Action: Recieve email and password from front-end and then verify if the email and password entered is correct.If email is invalid send res status code 404.
        If password entered is incorrect then send res status code 401.
      * Response: If error, then send res status code 500. Otherwise generate token and send res status code 200.
    iii.User Register: 
      * Entry Point: "/user/register"
      * Action: Recieve data from front-end and then hash the password using bcryptjs.
        Create record in user database.
      * Response: If error, then send res status code 500. Otherwise generate token and send res status code 200.
    iv.User Login: 
      * Entry Point: "/user/login"
      * Action: Recieve email and password from front-end and then verify if the email and password entered is correct.If email is invalid send res status code 404.
        If password entered is incorrect then send res status code 401.
      * Response: If error, then send res status code 500. Otherwise generate token and send res status code 200.
