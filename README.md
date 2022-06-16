# MERN-Social-Media
<b>A Full-stack Social Media Application Using the MERN Stack</b>

![MERN STACK OVERVIEW](./readme_resources/MERN_mongoose.png)

<h2>Overview:</h2>
MERN-Social-Media is a fully functioning and deployed full-stack web application accessible on <a href="https://mern-socialmedia-ethanduong.netlify.app/posts">Netlify</a>. As a full-stack application, there are many parts/components that work together to make the application functional. We use React for our frontend, Node and Express for our backend server (REST API), and MongoDB as our database. Likewise, we use React-Router for client side routing and Mongoose as our Object Document Mapper. Lastly, we use React-Redux to handle global state management. The above diagram demonstrates the high-level relationship that these technologies have with each other (minus redux). 

<h2>Backend:</h2>
All backend code is stored in a server folder. The server folder contains an additional git repository that is used for pushing our node server onto heroku. The backend section of this readme is split into database, server, and authentication sections. 
 
<h3>Database:</h3>
MongoDB and express server communicate via mongoose. Data is stored and retrieved according to the following mongoose schema(s): 

```
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: { type: String },
});
```

Thus our database has two collections: one for users and one for posts. Instead of running our database locally during the development process, we opted for MongoDB’s free cloud service: MongoDB Atlas. For our final product, we still use MongoDB Atlas to host the database for this project.

<h3>Node Server:</h3>

Our server is an Express application that listens on a certain URL and accepts and sends data to/from the front-end in JSON formats.

Our express app listens on localhost:5000 for local development and on this <a href="https://mern-socialmedia-ethanduong.netlify.app/posts">Heroku URL</a> during production. Express creates a REST API for the front-end to use on these previously mentioned URLS. Our frontend can access the API using the following server endpoints. As mentioned previously, data is sent and received as JSON. 

![SERVER_ENDPOINTS](./readme_resources/server_routes.PNG)

<h2>Frontend:</h2>

All frontend code is stored in the client folder. The frontend can be ran locally using `$ npm start` or you can access the deployed version on <a>Netlify</a>. The frontend section of this readme is split into routes and redux sections. 

<h3>Frontend Routes:</h3>
