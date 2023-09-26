// STEP 1. IMPORT MONGOOSE
const mongoose = require("mongoose");

// STEP 2. CREATE YOU DATA SCHEMA
const vegetableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  readyToEat: {
    type: Boolean,
  }
});

// STEP 3. CREATE YOUR MODEL USING YOUR SCHEMA
const Vegatable = mongoose.model("Vegetable", vegetableSchema);

// STEP 4. EXPORT YOUR NEWLY CREATED MODEL
module.exports = Vegatable;














// const vegetables = [
//     {
//         name:'tomato',
//         color: 'red',
//         readyToEat: true
//     },
//     {
//         name:'carrot',
//         color: 'green',
//         readyToEat: false
//     },
//     {
//         name:'mushroom,',
//         color: 'white',
//         readyToEat: true
//     },
//     {
//         name:'green beans',
//         color:'yellow',
//         readyToEat:'false'
//     },
//     {
//         name:'spinach',
//         color:'green',
//         readyToEat:'true'
//     }

// ];    

// module.exports = vegetables;