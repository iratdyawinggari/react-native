
export const createReservation = (reservation) => {
    return {
        type: 'CREATE_RESERVATION',
        payload: reservation
    };
};

