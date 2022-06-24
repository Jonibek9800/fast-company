import { orderBy } from "lodash";
import React from "react";
import { useComents } from "../../hooks/useComents";
import AddCommentLists from "../common/comments/addCommentForms";
import CommentList from "../common/comments/commentsList";

const Comments = () => {
    const { comments, createComment, removeComment } = useComents();
    const handleSubmit = (data) => {
        createComment(data);
        // api.comments.add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]));
    };
    const handleRemoveComments = (id) => {
        removeComment(id);
        // api.comments.remove(id).then((id) => {
        //     setComments(comments.filter((x) => x._id !== id));
        // });
        console.log(id);
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
                {<CommentList comments={sortedComments} onRemove={handleRemoveComments} />}
            </div>
        </div>}
    </>);
};

export default Comments;
