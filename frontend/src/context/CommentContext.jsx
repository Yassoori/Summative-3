import { createContext, useReducer } from "react";

export const CommentsContext = createContext()

export const CommentsReducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_COMMENT':
            return {
                comments: state.comments.filter((comment) => comment._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const CommentsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(CommentsReducer, {
        comments: null
    })
    return (
        <CommentsContext.Provider value={{...state,dispatch}}>
            {children}
        </CommentsContext.Provider>
    )
}