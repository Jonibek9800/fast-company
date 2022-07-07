import React from "react";
import PropTypes from "prop-types";
import Spiner from "../../common/Spiner";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { getUserById } from "../../../store/users";
import { useSelector } from "react-redux";

const UserPage = ({ id }) => {
    const user = useSelector(getUserById(id));
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard {...user} />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard count={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                            <Comments />
                    </div>
                </div>

            </div>

        );
    } else {
        return <Spiner />;
    }
};
UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
