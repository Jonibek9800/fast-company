import React from "react";

const renderPhrase = (number) => {
    return number !== 0
        ? (
            <span className="badge bg-primary">
                {number} тусанет с тобой сегодня
            </span>
        )
        : (
            <span className="badge bg-danger">Никто с тобой не тусанет</span>
        );
};

export default renderPhrase;
