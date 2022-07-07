import { createSlice, nanoid } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities = [...state.entities, action.payload];
        },
        deletedComment: (state, action) => {
            const comments = [...state.entities];
            const newComments = comments.filter((comment) => comment._id !== action.payload);
            state.entities = [...newComments];
        }
    }
});
const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsReceved,
    commentsRequestFiled,
    commentCreated,
    deletedComment
} = actions;

export const loadcommentsList = (userId) => async (dispatch) => {
        try {
            const { content } = await commentService.getComments(userId);
            dispatch(commentsReceved(content));
        } catch (error) {
            dispatch(commentsRequestFiled(error.message));
        }
};
export const createComment = (payload, userId) => async (dispatch) => {
    const comment = {
        ...payload,
        _id: nanoid(),
        pageId: userId,
        created_at: Date.now(),
        userId: userId
    };
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};
export const removeComment = (id) => async (dispatch) => {
    try {
        const { content } = await commentService.removeComments(id);
        if (content === null) {
            dispatch(deletedComment(id));
        }
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
