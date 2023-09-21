const express = require("express");
const mongoose = require("mongoose");
const app = express();
const jsxEngine = require("jsx-view-engine");
// IMPORT DOTENV MODULE TO CONNECT TO YOUR ENV FILE
const dotenv = require("dotenv");

// const fruits = require("./models/fruits.js"); //NOTE: it must start with ./ if it's just a file, not an NPM package

const Fruit = require("./models/fruits");

const vegetables = require("./models/vegetables.js");
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to mongo");
})

//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

// index, new, delete. Update, create, edit. And show.

app.get("/fruits/", async (req, res) => {
  // res.send(fruits);
  // res.render("fruits/Index", { fruits: fruits });
  try {
    const fruits = await Fruit.find();
    res.render("fruits/Index", {fruits: fruits});
  } catch(error) {
    console.error(error);
  }
});

app.get("/vegetables/", (req, res) => {
  res.render("vegetables/Index", { vegetables: vegetables });
});

// new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

// delete

// update

// create
app.post("/fruits",  async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    // fruits.push(req.body);
     await Fruit.create(req.body);

    res.redirect("/fruits");

  } catch(error) {
    console.log(error);
  }
});

app.post("/vegetables", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  vegetables.push(req.body);
  res.redirect('/vegetables');
});

//add show route
app.get("/fruits/:id", async (req, res) => {

  try {
    const fruit = await Fruit.findById(req.params.id);

    res.render("fruits/Show", {fruit: fruit})
  } catch(error) {
    console.log(error)
  }
});

app.get("/vegetables/:indexOfVegetablesArray", (req, res) => {
  res.render("vegetables/Show", {
    vegetable: vegetables[req.params.indexOfVegetablesArray],
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening");
});


























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