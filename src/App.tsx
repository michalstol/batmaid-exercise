import React, { useEffect } from 'react';

import './styles/app.scss';

import { useAppSelector, useAppDispatch } from './app/hooks';
import { fetchJobs, selectJobsStatus } from './api/jobsSlice';

import Dashboard from './components/Dashboard/Dashboard';
import Error from './components/Error/Error';

function App() {
    const jobsStatus = useAppSelector(selectJobsStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // fetching a data from API
        dispatch(fetchJobs());
    }, [dispatch]);

    return (
        <div className="dashboard">
            <div className="dashboard__container">
                <header className="header">
                    <h1 className="title">All my cleanings</h1>
                </header>

                {/* Depends on the jobsStatus variable render a different component */}
                {jobsStatus !== 'failed' && <Dashboard />}
                {jobsStatus === 'failed' && <Error />}
            </div>
        </div>
    );
}

export default App;
