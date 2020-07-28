export const createReservationReducer = (reservation = {}, action) => {
    if (action.type === 'CREATE_RESERVATION') {
        return action.payload;
    }
    return reservation;
};

