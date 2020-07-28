import API from '../api';
import * as SecureStore from 'expo-secure-store';

global.Buffer = global.Buffer || require('buffer').Buffer;

export async function getImageProfileApi(nameImg) {
    let myToken = await SecureStore.getItemAsync("token");

    return API.get(`/download?userId=${nameImg}`,
        {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        }
    );
}


export async function doUploadApi(img, nameImg) {
    let myToken = await SecureStore.getItemAsync("token");

    let buf = Buffer.from(img, 'base64');

    console.log("ini buf : " + buf);
    console.log("ini img : " +img);

    return API.post(`/upload?userId=${nameImg}`, buf,
        {
            headers: {
                Authorization: `Bearer ${myToken}`,
                'Content-Type': 'application/octet-stream'
            }
        }
        )
}


export async function doUpdateImageApi(img, nameImg) {
    let myToken = await SecureStore.getItemAsync("token");

    let buf = Buffer.from(img, 'base64');

    console.log("ini buf : " + buf);
    console.log("ini img : " +img);

    return API.post(`/upload/update?userId=${nameImg}`, buf,
        {
            headers: {
                Authorization: `Bearer ${myToken}`,
                'Content-Type': 'application/octet-stream'
            }
        }
    )
}
