const React = require("react");
const DefaultLayout = require("../layouts/default");

class Show extends React.Component {
  render() {
    const vegetable = this.props.vegetable;

    console.log(vegetable);

    return (
      <DefaultLayout title={"Vegetables Show Page"}>
        <h1> Show Page </h1>
        The {vegetable.name }.{" "} is {vegetable.color}.{" "}

        {vegetable.readyToEat
          ? "It is ready to eat"
          : "It is not ready to eat... Cant touch this"}
        <br />
        <a href="/vegetables">Home</a>
      </DefaultLayout>
    );
  }
}
module.exports = Show;

// const React = require('react')
// class Show extends React.Component {
//   render () {
//    const vegetable = this.props.vegetable
//     return (
//       <div>
//       <h1>Vegetable Show Page </h1>
//         The {vegetable.name} is {vegetable.color}
//         {vegetable.readyToEat? 'Its is ready to eat' : 'It is not ready to eat... Cant touch this' }
//       </div>
//       );
//      }
//    }
//   module.exports = Show;
