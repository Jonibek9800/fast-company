import React from "react";
import NavBar from "./components/ui/navBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Users from "./layout/users";
import Main from "./layout/main";
import Login from "./layout/login";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layout/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
    return (
        <>
        <AppLoader>
                <NavBar />
                        <Switch>
                                <Route path="/" exact component={Main}/>
                                <Route path="/login/:type?" component={Login}/>
                                <Route path="/logout" component={LogOut} />
                                <ProtectedRoute path="/users/:userId?/:edit?" component={Users}/>
                                <Redirect to="/"/>
                        </Switch>
        </AppLoader>
            <ToastContainer />
        </>
    );
};

export default App;
