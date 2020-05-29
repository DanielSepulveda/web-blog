## About this project
This Web App is a shared Blog intended for persons to share their knowledge and ideas. Using Next.js, a React framework used to create SSG and SSR pages. DatoCMS for managing the web app content, images and comments. Algolia for creating a application search engine experience for the users. And Amazon Lambda for conecting DatoCMS with Algolia indexes.

## Tools used
* **Passport**

Authentication services

* **Formik**

React forms

* **Yup**

Validation schema

* **Mongoose**

Connection to MongoDB and models

* **DatoCMS**

Content MAnagment Service

* **Algolia**

Application Search Engine

* **bcryptjs**

Encryption service

* **notistack**

Application notification service

* **swr**

Application fetch service

* **shortid**

Unique Id client generator

* **remark**

Markdown processor

* **tailwindcss**

CSS library

* **uuid**

Unique Id generator


## Getting Started

First, install the dependencies:
```bash
npm install
# or
yarn 
```
Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).


## Authentication
We use a external service called Passport in SignUp and Login. It returns the session of the User to the client inside a cookie. On every request the passport middleware authenticates the user with the session cookie and populates the request with the user information if the User in Logged In.

## API endpoints
 * login. Method: POST. Used to authenticate the User
 * signup. Method: POST. Used to register the User email and password in the database.
 * user. Method: GET. Used to get the current User logged in.
 * userInfo. Method: GET. Used to extract the info of the User in DatoCMS.
 * comments
   * create. Method: POST. Used to create a new comment and add it to the User.
 * likes
   * create. Method: POST. Used to create a Like and add it to the User
   * postLiked Method: POST. Used to know if a Post is liked by a User
   * remove Method: POST. Used to remove a Like of a User from a Post
   
## Authors

#### Daniel Sepulveda
#### Martin Ruiz
