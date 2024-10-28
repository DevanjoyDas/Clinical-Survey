
export const fetchFacilitiesAccordingToCountries = async (page) => {
    try {
        const response = await fetch(`/api/analytics/locations?page=${page}`,{
            credentials:'include'
        }); 
        const data = response.json();
        return data;
    } catch (error) {
        console.error('Error fetching countries data:', error);
        throw error;
    }
};

export const fetchDemographics = async () => {
    try {
        const response = await fetch('/api/analytics/demographics',{
            credentials:'include'
        }); 
        const data = response.json();
        return data;
    } catch (error) {
        console.error('Error fetching countries data:', error);
        throw error;
    }
};
export const fetchTopCitiesByCountOfFacilities = async () => {
    try {
        const response = await fetch('/api/analytics/trials-per-city',{
            credentials:'include'
        }); 
        const data = response.json();
        return data;
    } catch (error) {
        console.error('Error fetching countries data:', error);
        throw error;
    }
};

export const fetchClinicalTrialsData = async () => {
    try {
        const response = await fetch('/api/analytics/getClinicalTrialsData',{
            credentials:'include'
        }); 
        const data = response.json();
        return data;
    } catch (error) {
        console.error('Error fetching countries data:', error);
        throw error;
    }
};


// export const fetchDemographics = async () => {
//     try {
//         const response = await api.get('/api/analytics/demographics'); 
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching demographics data:', error);
//         throw error;
//     }
// };

// export const fetchTopCitiesByCountOfFacilities = async () => {
//     try {
//         const response = await api.get('/api/analytics/trials-per-city'); 
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching cities data:', error);
//         throw error;
//     }
// };

// export default api;
