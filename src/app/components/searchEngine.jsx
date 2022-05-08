import React from "react";
import PropTypes from "prop-types";

const SearchEngine = ({ value, onChange }) => {
    return (
        <div className="m-2 w-100">
            <input type="text" className="w-100 p-1" placeholder="Search..." value={value} onChange={onChange} />
        </div>
    );
};
SearchEngine.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default SearchEngine;
