// redux/slices/api1Slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMethod = createAsyncThunk('analyticsReducer/fetchData', async (api) => {
    

    if(api.name === "fetchFacilitiesAccordingToCountries"){
        const response = await api.func(api.page);
        return response.countries;
    }
    else if(api.name === "fetchDemographics"){
        const response = await api.func();
        return response;
    }
    else if(api.name === 'fetchClinicalTrialsData'){
        const response = await api.func();
        return response;
    }

    else{
        const response = await api.func();
        return response;
    }
});

// export const fetchDemographicsMethod = createAsyncThunk('analyticsReducer/fetchData', async () => {
//     const response = await fetchDemographics();
//     return response.data;
// });

// export const fetchTopCitiesByCountOfFacilitiesMethod = createAsyncThunk('analyticsReducer/fetchData', async () => {
//     const response = await fetchTopCitiesByCountOfFacilities();
//     return response.data;
// });

const api1Slice = createSlice({
    name: 'analyticsReducer',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMethod.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMethod.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchMethod.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default api1Slice.reducer;
