import API from '../api'
import * as SecureStore from 'expo-secure-store';

// export function getHospital() {
//     return API.get('/hospitals');
// }
//
// export function getDistrict() {
//     return API.get('/hospitals/districts')
// }
//
// export function getHospitalByDistrict(district) {
//     console.log(`this is from api district : ${district}`);
//     return API.get(`/hospitals/district?district=${district}`);
// }

export async function getNearbyHospital(longitude, latitude) {
    let myToken = await SecureStore.getItemAsync("token");

    return API.get(`hospitals/distances?latitude=${latitude}&longitude=${longitude}`,
        {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        }
        );
}

export async function getDoctorByHospitalApi(hospitalId) {
    console.log(`this is from api district : ${hospitalId}`);
    let myToken = await SecureStore.getItemAsync("token");

    return API.get(`/doctors/hospitalId?hospitalId=${hospitalId}`,

        {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        }
        );
}
