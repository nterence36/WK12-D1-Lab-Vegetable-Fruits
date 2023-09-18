eek 12 - Day 1
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