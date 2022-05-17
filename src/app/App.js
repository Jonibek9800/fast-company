import React from "react";
import NavBar from "./components/ui/navBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Users from "./layout/users";
import Main from "./layout/main";
import Login from "./layout/login";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/main" component={Main}/>
                <Route path="/login/:type?" component={Login}/>
                <Route path="/users/:userId?/:edit?" component={Users}/>
                <Redirect to="/"/>
            </Switch>
        </>
    );
};

export default App;
