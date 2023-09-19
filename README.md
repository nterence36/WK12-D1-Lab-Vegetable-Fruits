                                                                        
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