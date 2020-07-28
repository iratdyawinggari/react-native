export const userActiveReducer = (userActive = {}, action) => {
    if (action.type === 'AUTH_USER') {
        return action.payload;
    }
    return userActive;
};


export const myUserReducer = (user = {}, action) => {
    if (action.type === 'CREATE_USER') {
        return action.payload;
    }
    return user;
};
