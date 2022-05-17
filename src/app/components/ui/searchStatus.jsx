import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ count }) => {
    return count !== 0
        ? (
            <span className="badge bg-primary">
                {count} тусанет с тобой сегодня
            </span>
        )
        : (
            <span className="badge bg-danger">Никто с тобой не тусанет</span>
        );
};
SearchStatus.propTypes = {
    count: PropTypes.number
};

export default SearchStatus;
