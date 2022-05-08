import React from "react";
import NavBar from "./components/navBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Users from "./layout/users";
import Main from "./layout/main";
import Login from "./layout/login";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Redirect> <Route path="/main" component={Main}/></Redirect>
                <Redirect><Route path="/login" component={Login}/></Redirect>
                <Redirect><Route path="/users/:userId?" component={Users}/></Redirect>
            </Switch>
        </>
    );
};

export default App;
