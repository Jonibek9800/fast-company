import React, { useState } from "react";
import renderPhrase from "./components/searchStatus";
import api from "./api";
import Users from "./components/users";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };
    return (
        <>
            <h4>{renderPhrase(users.length)}</h4>
            <Users onDelete={handleDelete} users={users}/>
        </>
    );
};

export default App;
