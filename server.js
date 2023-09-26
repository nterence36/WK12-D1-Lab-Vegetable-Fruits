// Add dotenv
require('dotenv').config()
// Load express...
const express = require('express')
const app = express()
const jsxEngine = require('jsx-view-engine')

const methodOverride = require('method-override')

const mongoose = require('mongoose')
// connect to Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

// data
// const fruits = require('./models/fruits')
// const vegetables = require('./models/vegetables')
const Fruit = require('./models/fruits.js')
 // const Vegetables = require('./models/vegetables')
const Vegetable = require('./models/vegetables.js')

// adding our view templates


app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}))

app.use(methodOverride('_method'))

app.use((req, res, next) => {
    console.log('I run for all routes')
    next()
})
// seed route
app.get('/fruits/seed', async (req, res)=>{
  try {
      await Fruit.create([
      {
          name:'grapefruit',
          color:'pink',
          readyToEat:true
      },
      {
          name:'grape',
          color:'purple',
          readyToEat:false
      },
      {
          name:'avocado',
          color:'green',
          readyToEat:true
      }
  ])
      res.redirect('/fruits')
  } catch (error) {
      console.error(error)
    }
});
// routes INDUCES
// Index route - All the fruits
app.get("/fruits/", async (req, res) => {
    // res.send(fruits);
    // res.render("fruits/Index", { fruits: fruits });
    try {
      const fruits = await Fruit.find({});
      res.render("fruits/Index", {fruits: fruits});
    } catch(error) {
      console.error(error);
    }
  });

app.get("/vegetables/", async (req, res) => {
  try {
     const vegetables = await Vegetable.find({});
    res.render("vegetables/Index", {vegetables: vegetables});
  } catch(error) {
    console.error(error);
  }
});


// New - get the form to add a new fruit
app.get('/fruits/new', (req, res) => {
    res.render('fruits/New')
})

app.get('/vegetables/new', (req, res) => {
    res.render('vegetables/New')
})

// Delete
//Fruits
app.delete('/fruits/:id', async (req, res)=>{
    try {
        await Fruit.findByIdAndRemove(req.params.id)
        res.redirect('/fruits')//redirect back to fruits index
    } catch(error) {
        console.error(error);
      }
    })
   
//Vegetables delete route
app.delete('/vegetables/:id', async (req, res)=>{
  try {
      await Vegetable.findByIdAndRemove(req.params.id)
      res.redirect('/vegetables')//redirect back to vegetables index
  } catch(error) {
      console.error(error);
    }
  })
 
// Update
app.put("/fruits/:id",  async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false //do some data correction
    }
    // fruits.push(req.body);
     await Fruit.findByIdAndUpdate(req.params.id, req.body)

    res.redirect("/fruits")

  } catch(error) {
    console.log(error)
  }
})

// Update vegetable routes
app.put("/vegetables/:id",  async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false //do some data correction
    }
    // fruits.push(req.body);
     await Vegetable.findByIdAndUpdate(req.params.id, req.body)

    res.redirect("/vegetables")

  } catch(error) {
    console.log(error)
  }
})


//Create - Add a new fruit to your fruits
app.post("/fruits",  async (req, res) => {
    try {
      if (req.body.readyToEat === "on") {
        //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true //do some data correction
      } else {
        //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false //do some data correction
      }
      // fruits.push(req.body);
       await Fruit.create(req.body)
  
      res.redirect("/fruits")
  
    } catch(error) {
      console.log(error)
    }
  })

  // Create - Add a new vegetable to your vegetables list
  app.post("/vegetables",  async (req, res) => {
    try {
      if (req.body.readyToEat === "on") {
        //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true //do some data correction
      } else {
        //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false //do some data correction
      }
      
       await Vegetable.create(req.body)
  
      res.redirect("/vegetables")
  
    } catch(error) {
      console.log(error)
    }
  })

//Edit route
app.get('/fruits/:id/edit', async (req, res)=>{
  try {
      const foundFruit = await Fruit.findById(req.params.id)
      res.render('fruits/Edit', 
      {fruit: foundFruit})
  } catch(error) {
      console.log(error)
    }
})

app.get('/vegetables/:id/edit', async (req, res)=>{
  try {
      const foundVegetable = await Vegetable.findById(req.params.id)
      res.render('vegetables/Edit', 
      {vegetable: foundVegetable})
  } catch(error) {
      console.log(error)
    }
})

// Show route - one particular fruit by ID
app.get("/fruits/:id", async (req, res) => {

    try {
      const fruit = await Fruit.findById(req.params.id)
  
      res.render("fruits/Show", {fruit: fruit})
    } catch(error) {
      console.log(error)
    }
  })
  

app.get('/vegetables/:indexOfVegArray', async (req, res) => {
  try {
    const vegetable = await Vegetable.findById(req.params.id)

    res.render("vegetables/Show", {vegetable: vegetable})
  } catch(error) {
    console.log(error)
  }
})
app.listen(3000, () => {
    console.log('listening')
})
