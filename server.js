const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");

const fruits = require("./models/fruits.js"); //NOTE: it must start with ./ if it's just a file, not an NPM package

const vegetables = require("./models/vegetables.js");

//adding view templates

app.set("view engine", "jsx");
app.engine("jsx", jsxEngine()); 

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

app.use((req, res, next) => {
  console.log('I run for all routes');
  next();
});


// INDUCES - Index, New, Delet, Create, Edit, Show
// Index route - All the Fruits
app.get("/fruits/", (req, res) => {
  // res.send(fruits);
  res.render("fruits/Index", { fruits: fruits });
});

// New - get the form to add new fruit
app.get('/fruits/new', (req, res) => {
  res.render('fruits/New');
})


// Delete
//Edit
// Create
app.post('/fruits', (req, res)=>{
  if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
  } else { //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
  }
  fruits.push(req.body);
  console.log(fruits);
  //res.send('data received');
  res.redirect('/fruits');  // Send the user back to /fruits
});



// Vegetables
app.get("/vegetables/", (req, res) =>{
    res.render("vegetables/Index", {vegetables: vegetables});
});

// New - get the form to add new vegetable
app.get('/vegetables/new', (req, res) => {
  res.render('vegetables/New');
})

// Create
app.post('/vegetables', (req, res)=>{
  if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
  } else { //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
  }
  vegetables.push(req.body);
  console.log(vegetables);
  //res.send('data received');
  res.redirect('/vegetables');  // Send the user back to /fruits
});


app.get("/fruits/:indexOfFruitsArray", (req, res) => {
  // res.send(fruits[req.params.indexOfFruitsArray]);
  res.render("fruits/Show", {
    //second param must be an object
    fruit: fruits[req.params.indexOfFruitsArray], //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
  }); // renders the info using the appropriate template
});

app.get("/vegetables/:indexOfVegetablesArray", (req, res) => {
    
    res.render("vegetables/Show", {
     
      vegetable: vegetables[req.params.indexOfVegetablesArray]
    }); 
  });
  

app.listen(3000, () => {
    console.log('listening');
});