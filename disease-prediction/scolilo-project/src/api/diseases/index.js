import API from '../api'
import * as SecureStore from 'expo-secure-store';

export async function getAllDiseasesApi() {

    let myToken = await SecureStore.getItemAsync("token");

    return API.get('/diseases',

        {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        }
        )
}

export async function getCriteriaByDiseaseIdApi(id) {
    let myToken = await SecureStore.getItemAsync("token");

    return API.get(`/indicators/diseaseId?diseaseId=${id}`,

        {
            headers: {
                Authorization: `Bearer ${myToken}`
            }
        }
        )

}

// export function getStatusIndicatorByDiseaseIdApi(id) {
//     return API.get(`/indicatorStatus/diseaseId?diseaseId=${id}`)
//
// }
