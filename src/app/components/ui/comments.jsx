import { orderBy } from "lodash";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment, getComments, getCommentsLoadingStatus, loadcommentsList, removeComment } from "../../store/comments";
import AddCommentLists from "../common/comments/addCommentForms";
import CommentList from "../common/comments/commentsList";
import Spiner from "../common/Spiner";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadcommentsList(userId));
    }, [userId]);
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    const handleSubmit = (data) => {
        dispatch(createComment(data, userId));
    };
    const handleRemoveComments = (id) => {
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (<>
        <div className="card mb-2">
            {" "}
            <div className="card-body ">
                {<AddCommentLists onSubmit={handleSubmit} />}
            </div>
        </div>
        {sortedComments.length > 0 && <div className="card mb-3">
            <div className="card-body ">
                <h2>Comments</h2>
                <hr />
                {!isLoading ? <CommentList comments={sortedComments} onRemove={handleRemoveComments} /> : <Spiner />}
            </div>
        </div>}
    </>);
};

export default Comments;
