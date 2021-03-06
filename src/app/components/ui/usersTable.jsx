import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import LinkUsername from "../page/linkUsername";
import Profession from "./profession";

const UserTable = ({ users, selectedSort, onSort }) => {
    const columns = {
        name: { path: "name", name: "Имя", component: (user) => (<LinkUsername id={user._id} name={user.name} />) },
        qualities: { name: "Качества", component: (user) => (<Qualities id={user.qualities} />) },
        professions: { name: "Профессия", component: (user) => (<Profession id={user.profession} />) },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: { path: "bookmark", name: "Избранное", component: <Bookmark /> }
    };
    return (
        <Table selectedSort={selectedSort} onSort={onSort} columns={columns} data={users} />
    );
};
UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired
};

export default UserTable;
