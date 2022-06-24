import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Profession from "./profession";
import { useAuth } from "../../hooks/useAuth";

const UserCard = ({ image, name, profession, rate, _id }) => {
    const history = useHistory();
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    const { currentUser } = useAuth();
    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUser._id === _id &&
                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm" onClick={handleClick}>
                        <i className="bi bi-gear"></i>
                    </button>}
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={image}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="65"
                        height="65"
                    />
                    <div className="mt-3">
                        <h4>{name}</h4>
                        <Profession id={profession} />
                        <div className="text-muted">
                            <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                            <i className="bi bi-caret-up text-secondary" role="button"></i>
                            <span className="ms-2">{rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
UserCard.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.string,
    rate: PropTypes.number,
    _id: PropTypes.string
};

export default UserCard;
