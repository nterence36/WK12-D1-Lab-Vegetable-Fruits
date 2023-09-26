const React = require("react");
const DefaultLayout = require('../layouts/default');

class Index extends React.Component {
  render() {
    const { vegetables } = this.props;
    return (
      <DefaultLayout title={"Vegetables Index Page"}>
      <nav>
        <a href="/vegetables/new">Create a New Vegetable</a>
      </nav>
      <ul>
      {this.props.vegetables.map((vegetable,i) => {
                  return <li key={i}>
                      <a href={`/vegetables/${vegetable.id}`}>{vegetable.name}</a>
                      {' '}is {vegetable.color} <br/>
                      { vegetable.readyToEat? <span>It is ready to eat</span>: <span> It is not ready to eat </span>}
                      {/* Your Delete Form Goes Here  It's incomplete we will fix below*/}
                      <form action={`/vegetables/${vegetable._id}?_method=DELETE`} method="POST">
                          <input type="submit" value="DELETE"/>
                      </form>
                      {/* Edit link */}
                      <a href={`/vegetables/${vegetable._id}/edit`}>Edit This Vegetable</a>
                  </li>
              })}
        </ul>
      </DefaultLayout>
    );
  }
}
module.exports = Index;
