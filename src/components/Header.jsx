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
            mode="horizontal"
            className="menu">
              <Menu.Item key="holiday-planner" className="menu-item">
                  <Link to="/">Holiday Planner</Link>
              </Menu.Item>
              <Menu.Item key="list" className="menu-item">
                  <Link to="/list">List</Link>
              </Menu.Item>
              <Menu.Item key="add" className="menu-item">
                  <Link to="/add">Add</Link>
              </Menu.Item>
              <Menu.Item key="help" className="menu-item">
                  <Link to="/help">Help</Link>
              </Menu.Item>
          </Menu>
        );
    }
}

export default Header;