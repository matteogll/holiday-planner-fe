import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import './App.css';
import HolidayTable from "./components/HolidayTable";
import AddHolidayForm from "./components/AddHolidayForm";
import EditHolidayForm from "./components/EditHolidayForm";
import Header from "./components/Header";
import Home from "./components/Home";
import Help from "./components/Help";


class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Route exact path="/" component={Home} />
                <Route path="/list" component={HolidayTable} />
                <Route path="/add" component={AddHolidayForm} />
                <Route path="/help" component={Help} />
                <Route path="/edit/:id" component={EditHolidayForm} />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
