import React, {Component} from "react";

class Home extends Component {

    handleClick(e) {
        console.log("Click: ", e)
    }
    render() {
        return (
          <h1>{"Holiday Planner Home"}</h1>
        );
    }
}

export default Home;