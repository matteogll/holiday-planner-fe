import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

class Header extends Component {

    handleClick(e) {
        console.log("Click: ", e)
    }
    render() {
        return (
          <Menu
            onClick={this.handleClick}
            mode="horizontal">
              <Menu.Item key="holiday-planner">
                  <Link to="/">Holiday Planner</Link>
              </Menu.Item>
              <Menu.Item key="list">
                  <Link to="/list">List</Link>
              </Menu.Item>
              <Menu.Item key="add">
                  <Link to="/add">Add</Link>
              </Menu.Item>
              <Menu.Item key="help">
                  <Link to="/help">Help</Link>
              </Menu.Item>
          </Menu>
        );
    }
}

export default Header;