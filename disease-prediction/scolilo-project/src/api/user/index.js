import API from '../api'
import * as SecureStore from 'expo-secure-store';

export function doAuth(userName, userPassword) {
    console.log(userName, userPassword)
    return API.post('/auth',
        { username: userName, password: userPassword }
    );
}

export async function getUserById(id) {
    let myToken = await SecureStore.getItemAsync("token");
    return API.get(`/users/id?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        }

    );
}

export function doCreateUserApi(userName, userPassword, fullName, birthDate, address, userEmail, noTelp, gender, roleId) {
    console.log('this is api : ' +gender);
    return API.post('/users',
        {
            username: userName,
            password: userPassword,
            fullname: fullName,
            birthDate: birthDate,
            address: address,
            email: userEmail,
            noTelp: noTelp,
            roleId: roleId,
            genderId: gender,
        }
    );
}

export async function doUpdateUserApi(userId, userName, userPassword, fullName, birthDate, address, userEmail, noTelp, gender, roleId) {
    console.log('this is api : ' +roleId);
    let myToken = await SecureStore.getItemAsync("token");
    return API.post('/users/update',
        {
            id: userId,
            username: userName,
            password: userPassword,
            fullname: fullName,
            birthDate: birthDate,
            address: address,
            email: userEmail,
            noTelp: noTelp,
            roleId: roleId,
            genderId: gender
        },

        {
        headers: {
            Authorization: `Bearer ${myToken}`
        }
    }
);
}


export async function getMyHistory(userId) {
    let myToken = await SecureStore.getItemAsync("token");
    return API.get(`/transactions/userId?userId=${userId}`,
        {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        }

    );
}

