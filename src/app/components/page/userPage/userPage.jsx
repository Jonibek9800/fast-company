import React from "react";
import PropTypes from "prop-types";
import Spiner from "../../common/Spiner";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useUsers } from "../../../hooks/useUsers";
import { ComentsProvider } from "../../../hooks/useComents";

const UserPage = ({ id }) => {
    const { getUserById } = useUsers();
    const user = getUserById(id);
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
                        <ComentsProvider>
                            <Comments />
                        </ComentsProvider>
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
