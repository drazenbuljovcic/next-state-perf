import { createContext, useContext, useEffect, useReducer } from 'react';
import { fetchUser } from './api';

import { useQuery } from 'react-query'

const initialState = { id: null };

const UserStateContext = createContext(initialState);
const UserActionContext = createContext(null);

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USER': return { ...state, ...action.payload };
        default: return state;
    }
};

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { isLoading, data } = useQuery('user', fetchUser);

    useEffect(() => {
        if (!isLoading) {
            dispatch({ type: 'SET_USER', payload: data });
        }
    }, [isLoading, data]);

    return (
        <UserActionContext.Provider value={dispatch}>
            <UserStateContext.Provider value={state}>
                {children}
            </UserStateContext.Provider>
        </UserActionContext.Provider>
    )
};

export const withUser = Component => (props) => (
    <UserProvider>
        <Component {...props} />
    </UserProvider>
);

export const useUserState = () => useContext(UserStateContext);
export const useUserActions = () => useContext(UserActionContext);
