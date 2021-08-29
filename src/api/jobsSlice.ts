import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

import { JobsByLocationData } from '../api/jobsInterface';
import tranformResponse from '../api/jobsTransforms';

interface JobsState {
    status: 'idle' | 'loading' | 'success' | 'failed';
    data: JobsByLocationData[] | null;
}

const initialState: JobsState = {
    status: 'idle',
    data: null,
};

export const fetchJobs = createAsyncThunk('jobs/fetchData', async () => {
    // Get data from fake API
    const respons = await fetch('http://localhost:3001/jobs-data')
        .then(res => res.json())
        .then(data => tranformResponse(data));

    return respons;
});

export const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchJobs.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
            })
            .addCase(fetchJobs.rejected, state => {
                state.status = 'failed';
            });
    },
});

export const selectJobsStatus = (state: RootState) => state.jobs.status;
export const selectJobsData = (state: RootState) => state.jobs.data;

export default jobsSlice.reducer;
