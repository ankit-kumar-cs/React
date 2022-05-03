import { ADD_COMMENT, ADD_COMMENTS, COMMENTS_FAILED } from "./actionTypes";

const CommentReducer = (state = {
    errorMessage: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            const comment = action.payload;
            console.log("Comment", JSON.stringify(comment));
            console.log("State after", JSON.stringify({
                ...state,
                comments: [
                    ...state.comments,
                    comment
                ]
            }))
            return {
                ...state,
                comments: [
                    ...state.comments,
                    comment
                ]
            };
        case ADD_COMMENTS:
            return {
                ...state,
                errorMessage: null,
                comments: action.payload
            }
        case COMMENTS_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
                comments: []
            }
        default:
            return state;
    }
}
export default CommentReducer;