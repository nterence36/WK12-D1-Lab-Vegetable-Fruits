const React = require("react");

class Show extends React.Component {
  render() {
    const fruit = this.props.fruit;

    console.log(fruit);

    return (
      <div>
        <h1> Show Page </h1>
        The {fruit.name} is {fruit.color}.{" "}
        {fruit.readyToEat
          ? "It is ready to eat"
          : "It is not ready to eat... Cant touch this"}
      </div>
    );
  }
}
module.exports = Show;




// const React = require('react')
// class Show extends React.Component {
//   render () {
//    const fruit = this.props.fruit
//     return (
//       <div>
//       <h1> Show Page </h1>
//         The {fruit.name} is {fruit.color}
//         {fruit.readyToEat? 'Its is ready to eat' : 'It is not ready to eat... Cant touch this' }
//       </div>
//       );
//      }
//    }
//   module.exports = Show;