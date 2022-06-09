import React from "react";
import NavBar from "./components/ui/navBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Users from "./layout/users";
import Main from "./layout/main";
import Login from "./layout/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";

const App = () => {
    return (
        <>
            <NavBar />
            <QualityProvider>
                <ProfessionProvider>
                    <Switch>
                            <Route path="/main" component={Main}/>
                            <Route path="/login/:type?" component={Login}/>
                            <Route path="/users/:userId?/:edit?" component={Users}/>
                            <Redirect to="/"/>
                    </Switch>
                </ProfessionProvider>
            </QualityProvider>
            <ToastContainer />
        </>
    );
};

export default App;
