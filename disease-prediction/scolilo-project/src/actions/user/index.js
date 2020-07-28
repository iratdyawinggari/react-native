export const authUser = (user) => {
    return {
        type: 'AUTH_USER',
        payload: user
    };
};

export const createUser = (user) => {
    return {
        type: 'CREATE_USER',
        payload: user
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
};

