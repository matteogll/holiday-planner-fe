import React, {Component} from "react";

class Help extends Component {

    handleClick(e) {
        console.log("Click: ", e)
    }
    render() {
        return (
          <div>
              <h1>{"Holiday Planner Help"}</h1>
              <p>...</p>
          </div>
        );
    }
}

export default Help;