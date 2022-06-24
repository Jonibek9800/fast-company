import React, { useEffect } from "react";
import Spiner from "../components/common/Spiner";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);
    return (
        <Spiner />
    );
};

export default LogOut;
