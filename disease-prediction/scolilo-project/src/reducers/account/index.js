export const bankAccountReducer = (bankAccount = {}, action) => {
    if (action.type === 'GET_BANK_ACCOUNT') {
        return action.payload;
    }
    return bankAccount;
};