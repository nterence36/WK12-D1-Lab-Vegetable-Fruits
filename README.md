                                                                        
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




Welcome to Per Scholas
☰
/Week 13 - Day 2
Static Files
Lesson Objectives
Create a static files folder for CSS/JS
Create a static files folder for CSS/JS
CSS/JS code doesn't change with server-side data
We can toss any static files into a 'public' directory

static means unchanging
dynamic means changing depending on data
Let's set up a directory for our static code:

Create a directory called public
Inside the publicdirectory create a directory called css
Inside the cssdirectory, create an app.cssfile
Put some CSS in the app.cssfile
Inside server.js place the following near the top:
CSS
@import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');

body {
  background: url(https://images.clipartlogo.com/files/istock/previews/8741/87414357-apple-seamless-pastel-colors-pattern-fruits-texture-background.jpg);
  margin: 0;
  font-family: 'Comfortaa', cursive;
}

h1 {
  font-family: 'Righteous', cursive;
  background: antiquewhite;
  margin:0;
  margin-bottom: .5em;
  padding: 1em;
  text-align: center;
}

a {
  color: orange;
  text-decoration: none;
  text-shadow: 1px 1px 1px black;
  font-size: 1.5em;
  background: rgba(193, 235, 187, .9);
}

a:hover {
  color: ghostwhite;
}

li {
  list-style: none;
}

li a {
  color: mediumseagreen;
}

input[type=text] {
  padding: .3em;
}

input[type=submit] {
  padding: .3em;
  color: orange;
  background: mediumseagreen;
  font-size: 1em;
  border-radius: 10%;
}
```javascript
app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'
```
In your views/layout/Default.jsx, you can now call that css file

<link rel="stylesheet" href="/css/app.css">    
Section 2
Deployment
Roadmap
Make a new github repository.
set up environmental variables.
Remove node_modules.
Get started with deployment services.
Create app.
Attach MongoDB Atlas.
Update code.
Push git to deployment.
New Github Repository But verify you have a valid .gitignore file

Choose

a repository name
public (let your instructors help you if you get stuck, you can always change this later)
don't initialize with a README
don't Add .gitignore
dont add license - optional
Press the Create Repositorybutton when you're ready!

In Terminal type git remote add originand then paste the URL that you copied from github

Set the Node Engine
You should always specify a Node.js version that matches the runtime you're developing and testing with. Without setting this, your deployment service will 'guess' a version Node.js for you. One big gotcha is that some newer/updated npm packages just won't run on an older version of Node.js and vice versa.

So let's set the correct version:

In Terminal

node --version
The line returned is the version, currently, I have v14.17.0, but you should set it to whatever your version is.

In package.json, you can add enginesanywhere, just make sure you don't break the JSON format. In this example we are putting it between the auto-generated version and description fields. Don't forget double quotes and a ,

  "version": "1.0.0",
  "engines": {
    "node": "14.17.0"
  },
  "description": "",
Test your app
If your express app doesn't run locally it definitely won't run in deployment!
test it out and fix any bugs
git add/git commit
git add .
git commit -m 'Some Message'
git branch -M main<- only do this the first time you push to github
git push -u origin main<--- only add -uthe first time you push to github
Check this step carefully! Make sure node_modulesare NOT on github!! If they made it to github, that means they are not being ignored by .gitignore. If you don't properly ignore them now you'll have massive headaches with deployment later!

If You Need to Remove node_modules
In order for deployment to work, you can't have node_modulesin your repo. Instead, your deployment service will add this dir itself!

go to local repo dir
rm -rf node_modules
use git to: add, then commit, push
touch .gitignore
code .gitignore
add a line that says just node_modulesto .gitignore
save .gitignore
git: add, commit, push
to get it working locally again: npm install
Verify you Attached MongoDB Atlas
Just use your connection string as your DATABSE_URL.

Make sure you added .env and a .gitignore to exclude your .env file from your git repository.

In your server.js
// in your code
const PORT = process.env.PORT || 8000

// at the bottom
app.listen(PORT, () => {
  console.log('We in the building', PORT)
})
Push Git
First update your remote repo so you're code is up to date.

git add -A
git commit -m "updating code for deployment"
git push origin main
Now also push to deployment
Wait 1 minute, then you should be able to have your deployed app open up in your browser.

If thing's don't work out, relax and try to find out the error.
Troubleshooting
Having weird errors?
Deployment Can't Figure Out Your Language
the hidden folder .gitand package.jsonMUST be on the same level in your directory (the root)
Check that your have ignored node modules
Your node modules should NOT appear on github

no node modules

If you have not ignored your node modules, follow the steps listed above to remove and ignore them

Check that your config variables match
In your deployment service, under your app and its settings, Reveal Config Vars

In your own app, make sure you have your databse url equal to process.envand then .DATABSE_URL

and in your .env fileDATABASE_URL=thecorrectmongostring

It won't work if you make it a different variable name (lowercase, no underscore) - do not change it in your deployment! If you change it there you'll have to hunt how to update more things. Just set it in your own app.

Note: your the variable for the port is not listed, but it must be PORTall caps. It is accessed by process.env.PORT

Copyright © Per Scholas 2023


// URL	HTTP Verb	Action	Used For	Mongoose Model Function
// /things/	GET	index	Displaying a list of all things	.find
// /things/new	GET	new	Display HTML form for creating a new thing	N/A
// /things	POST	create	Create a new thing	.create
// /things/:id	GET	show	Display a specific thing	.findById
// /things/:id/edit	GET	edit	Return an HTML form for editing a thing	.findById
// /things/:id	PATCH/PUT	update	Update a specific thing	.findByIdAndUpdate
// /things/:id	DELETE	destroy	Delete a specific thing	.findByIdAndDelete








// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const jsxEngine = require("jsx-view-engine");
// // IMPORT DOTENV MODULE TO CONNECT TO YOUR ENV FILE
// const dotenv = require("dotenv");

// // const fruits = require("./models/fruits.js"); //NOTE: it must start with ./ if it's just a file, not an NPM package

// const Fruit = require("./models/fruits");

// const vegetables = require("./models/vegetables.js");
// app.set("view engine", "jsx");
// app.engine("jsx", jsxEngine());

// dotenv.config();

// const methodOverride = require('method-override');


// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.once("open", () => {
//   console.log("Connected to mongo");
// })

// //near the top, around other app.use() calls
// app.use(express.urlencoded({ extended: false }));

// //use methodOverride.  We'll be adding a query parameter to our delete form named _method
// app.use(methodOverride('_method'));


// app.use((req, res, next) => {
//   console.log("I run for all routes");
//   next();
// });

// // index, new, delete. Update, create, edit. And show.

// app.get("/fruits/", async (req, res) => {
//   // res.send(fruits);
//   // res.render("fruits/Index", { fruits: fruits });
//   try {
//     const fruits = await Fruit.find();
//     res.render("fruits/Index", {fruits: fruits});
//   } catch(error) {
//     console.error(error);
//   }
// });

// app.get("/vegetables/", (req, res) => {
//   res.render("vegetables/Index", { vegetables: vegetables });
// });

// // new
// app.get("/fruits/new", (req, res) => {
//   res.render("fruits/New");
// });

// app.get("/vegetables/new", (req, res) => {
//   res.render("vegetables/New");
// });

// // delete
// app.delete('/fruits/:id', (req, res)=>{
//   res.send('deleting...');
// });
// // update

// // create
// app.post("/fruits",  async (req, res) => {
//   try {
//     if (req.body.readyToEat === "on") {
//       //if checked, req.body.readyToEat is set to 'on'
//       req.body.readyToEat = true; //do some data correction
//     } else {
//       //if not checked, req.body.readyToEat is undefined
//       req.body.readyToEat = false; //do some data correction
//     }
//     // fruits.push(req.body);
//      await Fruit.create(req.body);

//     res.redirect("/fruits");

//   } catch(error) {
//     console.log(error);
//   }
// });

// app.post("/vegetables", (req, res) => {
//   if (req.body.readyToEat === "on") {
//     req.body.readyToEat = true;
//   } else {
//     req.body.readyToEat = false;
//   }
//   vegetables.push(req.body);
//   res.redirect('/vegetables');
// });

// //add show route
// app.get("/fruits/:id", async (req, res) => {

//   try {
//     const fruit = await Fruit.findById(req.params.id);

//     res.render("fruits/Show", {fruit: fruit})
//   } catch(error) {
//     console.log(error)
//   }
// });

// app.get("/vegetables/:indexOfVegetablesArray", (req, res) => {
//   res.render("vegetables/Show", {
//     vegetable: vegetables[req.params.indexOfVegetablesArray],
//   });
// });

// app.listen(process.env.PORT || 3000, () => {
//   console.log("listening");
// });















// app.post('/vegetables', (req, res) => {
//     if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
//         req.body.readyToEat = true //do some data correction
//     } else { //if not checked, req.body.readyToEat is undefined
//         req.body.readyToEat = false //do some data correction
//     }
//     vegetables.push(req.body)
//     // console.log(vegetables)
//     res.redirect('/vegetables') // send user back to main page
// })


// const express = require("express");
// const mongoose = require('mongoose');
// const app = express();
// const jsxEngine = require("jsx-view-engine");
// // Inport dotenv module to connect to your env file
// const dotenv = require("dotenv")

// //const fruits = require("./models/fruits.js"); //NOTE: it must start with ./ if it's just a file, not an NPM package

// const Fruit = require('./models/fruits.js');
// const vegetables = require("./models/vegetables.js");


// // connecting to env file
// dotenv.config()

// //connecting mangoose to get rid of errors
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
  
// });
// //... and then farther down the file
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once('open', ()=> {
//     console.log('connected to mongo');
// });

// //adding view templates

// app.set("view engine", "jsx");
// app.engine("jsx", jsxEngine()); 



// //near the top, around other app.use() calls
// app.use(express.urlencoded({extended:false}));

// app.use((req, res, next) => {
//   console.log('I run for all routes');
//   next();
// });


// // INDUCES - Index, New, Delet, Create, Edit, Show
// // // Index route - All the Fruits
// // app.get("/fruits/", (req, res) => {
// //   // res.send(fruits);
// //  // res.render("fruits/Index", { fruits: fruits });
// //     Fruit.find({}, (error, allFruits)=>{
// //       res.render('fruits/Index', {
// //           fruits: allFruits
// //       });
// //     });
// // });

// app.get("/fruits/", async (req, res) => {
//   // res.send(fruits);
//   // res.render("fruits/Index", { fruits: fruits });
//   try {
//     const fruits = await Fruit.find();
//     res.render("fruits/Index", {fruits: fruits});
//   } catch(error) {
//     console.error(error);
//   }

// });

// // New - get the form to add new fruit
// app.get('/fruits/new', (req, res) => {
//   res.render('fruits/New');
// })


// // Delete
// //Edit
// // Create
// // app.post('/fruits', (req, res)=>{
// //   if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
// //       req.body.readyToEat = true; //do some data correction
// //   } else { //if not checked, req.body.readyToEat is undefined
// //       req.body.readyToEat = false; //do some data correction
// //   }
// //   fruits.push(req.body);
// //   console.log(fruits);
// //   //res.send('data received');
// //   res.redirect('/fruits');  // Send the user back to /fruits
// // });

// app.post("/fruits", async (req, res) => {
//   try {
//     if (req.body.readyToEat === "on") {
//       //if checked, req.body.readyToEat is set to 'on'
//       req.body.readyToEat = true; //do some data correction
//     } else {
//       //if not checked, req.body.readyToEat is undefined
//       req.body.readyToEat = false; //do some data correction
//     }
//     // fruits.push(req.body);
//     await Fruit.create(req.body);

//     res.redirect("/fruits");
    
//   } catch(error) {
//     console.log(error);
//   }
// });


// // Vegetables
// app.get("/vegetables/", (req, res) =>{
//     res.render("vegetables/Index", {vegetables: vegetables});
// });

// // New - get the form to add new vegetable
// app.get('/vegetables/new', (req, res) => {
//   res.render('vegetables/New');
// })

// // Create
// app.post('/vegetables', (req, res)=>{
//   if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
//       req.body.readyToEat = true; //do some data correction
//   } else { //if not checked, req.body.readyToEat is undefined
//       req.body.readyToEat = false; //do some data correction
//   }
//   vegetables.push(req.body);
//   console.log(vegetables);
//   //res.send('data received');
//   res.redirect('/vegetables');  // Send the user back to /fruits
// });


// app.get("/fruits/:indexOfFruitsArray", (req, res) => {
//   // res.send(fruits[req.params.indexOfFruitsArray]);
//   res.render("fruits/Show", {
//     //second param must be an object
//     fruit: fruits[req.params.indexOfFruitsArray], //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
//   }); // renders the info using the appropriate template
// });

// app.get("/vegetables/:indexOfVegetablesArray", (req, res) => {
    
//     res.render("vegetables/Show", {
     
//       vegetable: vegetables[req.params.indexOfVegetablesArray]
//     }); 
//   });
  

// app.listen(process.env.PORT || 3001, () => {
//     console.log('listening');
// });