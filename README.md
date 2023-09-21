                                                                        
                                                                        week 12 - Day 1
Practice What You Learned
Vegetables
CRUD, MVC, REST, INDUCES and JSX: Remember where we are going

Learning Objectives
Practicing index and show, new and create routes with express
Prerequisites
JavaScript
Express
Node
JSX


Steps

Add A second Model File For Vegetables to your fruits app
Add 5 Vegetables
Create Index, Show, New and Create routes for Vegetables
Create Index, Show and New jsxViews
Refactor your application to work appropriately hintviews can be reused but you can also make subfolders in the views folder, take the subfolders approach so that you can still follow along in class.

The User Stories

When a user goes to the /vegatablesroute they will see an indexof veggies on the page
When a user clicks on the name of the vegetable, they will be taken to that vegetable's showpage, and will see the vegatables's name and color and if its READYTOEAT.
When a user goes to /vegetables/newa user sees a form that allows them to create a brand new vegetable, and then redirects the user back to /vegetables
Hints
/views/fruits/Index.jsx
/views/vegetables/Index.jsx

res.render('vegetables/Index', {...})

res.render('fruits/Index', {...})



                                                      
                                                      Week 12 - Day 2
Section 1
Begin with the End In Mind
New and Create Routes
Create a new route and page
Add interactivity to your site with forms
Create a post route
Define middleware
View body of a post request
Redirect the user to another page
Explanation
Remember where we are going
arthur_node_jsx_diagram_photoshopped

Create a new route and page
Let's create a page that will allow us to create a new fruit
First, we'll need a route for displaying the page in our server.js file IMPORTANT: put this above your show route, so that the show route doesn't accidentally pick up a /fruits/new request

//put this above your Show route
app.get('/fruits/new', (req, res) => {
    res.render('New');
});
Now lets's create the html for this page in our /views/New.jsx file

const React = require('react');

class New extends React.Component {
  render() {
    return <div>New Page</div>;
  }
}

module.exports = New;
Visit http://localhost:3000/fruits/new to see if it works
Add interactivity to your site with forms
We can use forms to allow the user to enter their own data:

   const React = require('react');

   class New extends React.Component {
     render() {
       return (
           <div>
               <h1>New Fruit page</h1>
               {/* NOTE: action will be the route, method will be the HTTP verb */}
               <form action="/fruits" method="POST">
                 Name: <input type="text" name="name" /><br/>
                 Color: <input type="text" name="color" /><br/>
                 Is Ready To Eat: <input type="checkbox" name="readyToEat" /><br/>
                 <input type="submit" name="" value="Create Fruit"/>
               </form>
           </div>);
       }
     }

   module.exports = New;
NOTE: the form element has an action and a method attribute. We get these values from our RESTful routes table. We'll need this info for the next step too.

Create a post route
Since the form in the last step tells the browser to create a POST request to /fruits, we'll need to set up a route handler for this kind of request

app.post('/fruits', (req, res) => {
    res.send('hi');
});
Define middleware
We can have a function execute for all routes:

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});
This is called 'middleware'
It runs in the middle of the request response cycle (in the middle)

sometime after the request is received, but before the final route handler is called
Be sure to put middleware at the top of your server.js file, so that other routes don't handle the request and send the response before the middleware can be executed
Most of the time, you won't write your own middleware, but a lot of plugins and extended functionality of express exist as middleware
Learn More

View body of a post request
The POST request to our sever has data in it (name, color, readyToEat, etc).
We can easily access this data with a middleware function
Tell express to use the middleware

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));
What does urlencoded do

Now inside the POST to /fruits route handler we can do the following:

app.post('/fruits', (req, res)=>{
    console.log(req.body);
    res.send('data received');
});
Push this data into our fruits array:

app.post('/fruits', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    fruits.push(req.body);
    console.log(fruits);
    res.send('data received');
});
Redirect the user to another page
The data has been added to our fruits array
Let's send the user back to the fruits index page upon completion
app.post('/fruits', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect('/fruits'); //send the user back to /fruits
});
Put a link in the index page going to the new page

<nav>
    <a href="/fruits/new">Create a New Fruit</a>
</nav>
❓ Essential Review Questions
What is the difference between New and Create?
What is Middleware?




Welcome to Per Scholas
PROFILE
/Week 12 - Day 3
Begin with the End In Mind
Initialize a directory
Start express
Create NewRoute
Create CreateRoute
Connect Express to Mongo
Create Fruits Model
Have Create Route Create data in MongoDB
Create Index Route
Have Index Route Render All Fruits
Have Create Route redirect to Index After Fruit Creation
Create Show Route
Have Index Page Link to Show Route
Create Show.JSXfile
CRUD, MVC, REST, INDUCES and JSX: Remember where we are going


arthur_node_jsx_diagram_photoshopped

mvc-meme

Model-View-Controller
Model–view–controller (MVC) is a software architectural pattern for implementing user interfaces on computers. It divides a given application into three interconnected parts. The division is done to separate internal representations of information from the way information is presented to, and accepted from, the user. The MVC design pattern decouples these significant components allowing for efficient code reuse and parallel development.

Advantages
Simultaneous development – multiple developers can work simultaneously on the model, controller, and views.

High cohesion
MVC enables logical grouping of related actions on a controller together. The views for a specific model are also grouped.

Low coupling
the MVC pattern ensures low coupling between models, views or controllers.

Ease of modification
because of the separation of responsibilities, future development or change is easier.

Multiple representations for a model
models can have various views.

Reminder of what we did to get here
Remember this how we Initialized a npm directory
First we Created a directory for the app in classworkcalled fruitsand cdinto it
touch server.js
npm init -y
npm i express jsx-view-engine react react-dom dotenv
Review some express boilerplate
const express = require('express');
const app = express();

app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine').createEngine());

// ...Other code
// ...More code
app.listen(3000, ()=>{
    console.log('listening');
});
Review how we put together the New Route
mkdir views
touch views/New.jsx
Create the view
const React = require('react');

class New extends React.Component {
  render() {
    return (
        <div>
            <h1>New Fruit page</h1>
            <form action="/fruits" method="POST">
                Name: <input type="text" name="name" /><br/>
                Color: <input type="text" name="color" /><br/>
                Is Ready To Eat: <input type="checkbox" name="readyToEat" /><br/>
                <input type="submit" name="" value="Create Fruit"/>
             </form>
        </div>);
  }
}

module.exports = New;
Render the view
app.get('/fruits/new', (req, res)=>{
    res.render('fruits/New');
});
Review how we put together the Create Route
app.post('/fruits/', (req, res)=>{
    res.send('received');
});
Use body parser in server.js:
app.use(express.urlencoded({extended:true}));
Check to see if req.body works:

app.post('/fruits/', (req, res)=>{
    res.send(req.body);
});
Format data properly
app.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect('/fruits')
});
Then we added vegetables
Now Lets connect to our MongoDB Database with Mongoose and MongoDB Atlas
Mongoose is the go to when it comes to working with a MongoDB.
We define Mongoose schemas, which are then compiled using the mongoose.modelmethod into Models.
We use a Model to perform all CRUD for a given MongoDB collection.
Our MongoDB information is a secret so we need to set up Environment Variables
Install dotenvnode package
Update .gitignoreto include .env (always do this before you commit anything in .env)
touch the .envfile
lets add our connection string into the .env
update our server.jsto add our require('dotenv').config()to the very top of the file
this places every kvp in our .envinto a javascript object called process.env
Create a cloud-based MongoDB database with Atlas
While developing an application that requires a MongoDB, you can only connect to your local MongoDB engine for so long. This is because the application, once deployed, will have to connect to a MongoDB engine accessible via the Internet. So we are going to use MongoDB Atlas from the beginning so that your application data always persists in the Cloud.

Some application hosting services we deploy our projects to are capable of supplying a MongoDB. However, delaying connecting to a hosted database until the time of deployment is not ideal...

It makes sense to set up and connect to a hosted MongoDB sooner, rather than later. Doing this will ensure that any data, users, etc., created will be there upon deployment.

In addition, it's advantageous to use a service to host MongoDB databases other than the deployment service, so that you can create databases anytime you want.

The most popular service for hosting MongoDB databases, not surprisingly, is MongoDB's own Atlas. ALSO NOTE: YOU WILL ONLY DO THIS ONCE !!!!! DON'T CREATE MULTIPLE CLUSTERS




Create an Atlas Account
First you will need to signup for a free account here:


Create a New Cluster
Once logged in, Atlas will request that you create a cluster. (click on build a New cluster, if you don't see create)

Atlas allows one free cluster per account.

A cluster can contain multiple MongoDB databases - which Atlas refers to as namespaces.

Be sure to select the Cloud Provider & Region nearest to you that shows a FREE TIER AVAILABLE:


Next, in the Cluster Tier section, select the M0 Sandboxtier:


Finally, you can optionally change the name of the cluster, then click the Create Clusterbutton:


It may take several minutes for Atlas to build your cluster.




Add a User for the Cluster
Each cluster must have a user created whose credentials will be provided in the database connection string when connecting to a database.

First click the Security tab:


Click the + ADD NEW USERbutton, then enter a username, password, select the Read and write to any database option, then click the Add Userbutton also note password should be letters and number only no special characters no spaces no underscores:




Update the Whitelisted IPs
Atlas has a security feature that allows the databases to be accessed by whitelisted (approved) IP addresses only.

However, you must whitelist all IPs to ease development and deployment of your application, once you are ready to deploy you will restrict it to only your ip and the ip of your deployed server (It's not time to do that yet though)

While still in the Security tab, click IP Whitelist, then click the + ADD IP ADDRESSbutton.

In the dialog, first click ALLOW ACCESS FROM ANYWHEREthen click the Confirmbutton:




Obtain the Connection String
To obtain the connection string for your .envfile, first click the CONNECTbutton:


Select the Connect Your Application option:


Next, ensure that the Node.js driver and latest version is selected. Then click the Copybutton to add the connection string to your clipboard:




Use the Connection String in Your App
You can now paste the connection string in the app's .envfile, assigning it to a MONGO_URIenvironment variable:

MONGO_URI=mongodb+srv://sei:<THISISTHEPASSWORD___REMOVE___THE___CARATS>@sei-w0kys.azure.mongodb.net/<THISISTHEDATABASENAME___REMOVE___THE___CARATS>?retryWrites=true
You're almost done, but you need to update the connection string as follows:

Replace <password>with the password of the database user you created earlier.
IMPORTANT The connection string by default connects to a namespace (database) named test(...mongodb.net/test?retryWrites=true...). However, the testnamespace must be updated to your preferred namespace (database) name. For example, "movies" (...mongodb.net/movies?retryWrites=true...).
You're good to go!




Connecting with Mongoose
Here's the latest options to include to get rid of the deprecation warnings:

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});



Viewing & Editing Data
FYI, you can use the Atlas app to view and edit data by clicking on the COLLECTIONSbutton.

Connect Express to Mongo
npm i mongoose
Inside server.js:
const mongoose = require('mongoose');

//... and then farther down the file
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});
Create Fruits Model
mkdir models
touch models/fruit.js
Create the fruit schema
const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    readyToEat: Boolean
});

const Fruit = mongoose.model('Fruit', fruitSchema);

module.exports = Fruit;
Have Create Route Create data in MongoDB
Inside server.js:

const Fruit = require('./models/fruit.js');
//... and then farther down the file
app.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit)=>{
        res.send(createdFruit);
    });
});
Review and Refactor Index Route
app.get('/fruits', (req, res)=>{
    res.send('Index');
});
touch views/Index.jsx

const React = require('react');

class Index extends React.Component {
  render() {
    return <div><h1>Fruits index page</h1></div>;
  }
}

module.exports = Index;
Render the jsx file
app.get('/fruits', (req, res)=>{
    res.render('fruits/Index');
});
Have Index Route Render All Fruits
app.get('/fruits', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('fruits/Index', {
            fruits: allFruits
        });
    });
});
Update the jsx file:

const React = require('react');

class Index extends React.Component {
  render() {
    return (
        <div>
            <h1>Fruits index page</h1>
            <ul>
                {
                   this.props.fruits.map((fruit, i) => {
                    return (
                        <li>
                        The { fruit.name } is { fruit.color }
                        { fruit.readyToEat ? `It is ready to eat` : `It is not ready to eat` }
                        </li>
                        )
                    })
                }
            </ul>
        </div> );
  }
}

module.exports = Index;
Add a link to the new page:
<nav>
    <a href="/fruits/new">Create a New Fruit</a>
</nav>
Have Create Route redirect to Index After Fruit Creation
Inside the create route

Fruit.create(req.body, (error, createdFruit)=>{
    res.redirect('/fruits');
});
Create Show Route
app.get('/fruits/:id', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.send(foundFruit);
    });
});
Have Index Page Link to Show Route
{
   this.props.fruits.map((fruit, i) => {
    return (
        <li>
        The <a href={`/fruits/${ fruit.id }`}> { fruit.name } </a> is { fruit.color }
        { fruit.readyToEat ? `It is ready to eat` : `It is not ready to eat` }
        </li>
        )
    })
}
Create Show.jsx
touch views/Show.jsx
Add JSX
const React = require('react');

class Show extends React.Component {
    render(){
        return (
            <div>
                <h1>Fruits show page</h1>
                The { this.props.fruit.name } is { this.props.fruit.color }
        { this.props.fruit.readyToEat ? `It is ready to eat` : `It is not ready to eat` }
            </div>
        )
    }
}
module.exports = Show;
Render the jsx

app.get('/fruits/:id', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('fruits/Show', {
            fruit:foundFruit
        });
    });
});
Review Questions
❓ In your own words, describe the use case for Mongoose (what is it's purpose and when might you choose to use it?).

❓ A Mongoose _ is compiled into a Mongoose Model.

❓ We use a Mongoose _ to perform CRUD operations on a MongoDB..




Section 2
Copyright © Per Scholas 2023

