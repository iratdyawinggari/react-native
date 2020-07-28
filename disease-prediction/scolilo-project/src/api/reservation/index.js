import API from '../api'
import * as SecureStore from 'expo-secure-store';

export async function getReservationById(id) {

    let myToken = await SecureStore.getItemAsync("token");
    return API.get(`/reservations/id?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        }
    )
}

export async function doReservation(patientName, reservationDate, hospitalId, doctor, bpjsNumber, identityCardNumber, arivalStatus) {
    console.log("dari api reservations : " +hospitalId);

    let myToken = await SecureStore.getItemAsync("token");

    return API.post('/reservations',
        {

            name: patientName,
            reservationDate: reservationDate,
            hospital: {
                id: hospitalId
            },

            doctor: {
                id: doctor
            },

            bpjsNumber: bpjsNumber,
            identityCardNumber: identityCardNumber,
            arrivalStatus: arivalStatus
        },

        {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        }

    );
}

export async function updateReservation(reservation, arivalStatus) {
    // console.log("------------");
    // console.log(reservation);
    // console.log(reservation.id);
    // console.log(arivalStatus)
    // console.log("------------");
    let myToken = await SecureStore.getItemAsync("token");

    return API.post('/reservations',
        {

            id: reservation.id,
            name: reservation.name,
            reservationDate: reservation.reservationDate,
            hospital: {
                id: reservation.id
            },

            doctor: {
                id: reservation.id
            },

            bpjsNumber: reservation.bpjsNumber,
            identityCardNumber: reservation.identityCardNumber,
            arrivalStatus: arivalStatus
        },

        {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        }
    );
}


