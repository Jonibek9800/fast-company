import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Spiner from "../components/common/Spiner";
import { logOut } from "../store/users";

const LogOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
       dispatch(logOut());
    }, []);
    return (
        <Spiner />
    );
};

export default LogOut;
