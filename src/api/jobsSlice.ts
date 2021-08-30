import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

import { JobsByLocationData } from '../api/jobsInterface';
import tranformResponse from '../api/jobsTransforms';

interface JobsState {
    status: 'idle' | 'loading' | 'success' | 'failed';
    upcoming: JobsByLocationData[] | null;
    previous: JobsByLocationData[] | null;
}

export const initialState: JobsState = {
    status: 'idle',
    upcoming: null,
    previous: null,
};

export const fetchJobs = createAsyncThunk('jobs/fetchData', async () => {
    // Get data from fake API
    // API works only when the "database" script is running
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
                // The prop "state" is not overwritten,
                // because Immer make it immutable
                state.status = 'loading';
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = 'success';
                state.upcoming = action.payload.upcoming;
                state.previous = action.payload.previous;
            })
            .addCase(fetchJobs.rejected, state => {
                state.status = 'failed';
            });
    },
});

export const selectJobsStatus = (state: RootState) => state.jobs.status;
export const selectJobsData = (state: RootState) => {
    const { upcoming, previous } = state.jobs;

    return { upcoming, previous };
};

export default jobsSlice.reducer;
