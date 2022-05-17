import React, { useState } from "react";

const Bookmark = (id) => {
    const mark = <i className="bi bi-bell"></i>;
    const fullMark = <i className="bi bi-bell-fill"></i>;

    const [favorite, setFavorite] = useState(false);

    const clickMark = () => {
        favorite === false
            ? setFavorite((prev) => (prev = true))
            : setFavorite((prev) => (prev = false));
    };
    return (
        <div onClick={clickMark} key={id}>
            {favorite === false ? mark : fullMark}
        </div>
    );
};

export default Bookmark;
