import React from "react";
import NavBar from "./components/navBar";
import { Switch, Route } from "react-router-dom";
import Users from "./components/users";
import Main from "./components/main";
import Login from "./components/login";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/main" component={Main}/>
                <Route path="/login" component={Login}/>
                <Route path="/users/:userId?" component={Users}/>
            </Switch>
        </>
    );
};

export default App;
