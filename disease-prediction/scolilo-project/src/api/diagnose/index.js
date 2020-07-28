import API from '../api'
import * as SecureStore from 'expo-secure-store';

export async function getAllCriteria() {

    let myToken = await SecureStore.getItemAsync("token");

    return API.get('/criterias',

        {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        }
        )
}
export async function doDiagnoseApi(patientName, userId, patientAge, patientGender, diseaseId, inputPointCombination) {

    let myToken = await SecureStore.getItemAsync("token");

    console.log("IP : "+inputPointCombination, patientGender);

    return API.post('/transactions/',
        {
            name: patientName,
            age: patientAge,
            userId: userId,
            genderId: patientGender,
            diseaseId: diseaseId,
            inputPointCombination: inputPointCombination

        },


        {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        }
    );
}


