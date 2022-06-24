import React from "react";
import NavBar from "./components/ui/navBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Users from "./layout/users";
import Main from "./layout/main";
import Login from "./layout/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layout/logOut";

const App = () => {
    return (
        <>
            <AuthProvider>
                <NavBar />

                <QualityProvider>
                    <ProfessionProvider>
                        <Switch>
                                <Route path="/" exact component={Main}/>
                                <Route path="/login/:type?" component={Login}/>
                                <Route path="/logout" component={LogOut} />
                                <ProtectedRoute path="/users/:userId?/:edit?" component={Users}/>
                                <Redirect to="/"/>
                        </Switch>
                    </ProfessionProvider>
                </QualityProvider>
            </AuthProvider>

            <ToastContainer />
        </>
    );
};

export default App;
