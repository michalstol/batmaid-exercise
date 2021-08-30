import React, { useState, useEffect, useCallback } from 'react';

import { useAppSelector } from '../../app/hooks';
import { selectJobsData, selectJobsStatus } from '../../api/jobsSlice';

import Nav from '../Nav/Nav';
import NavButton from '../NavButton/NavButton';
import Table from '../Table/Table';
import TableGroup from '../TableGroup/TableGroup';
import TableRecord from '../TableRecord/TableRecord';

export default function Dashboard(): React.ReactElement {
    const jobsStatus = useAppSelector(selectJobsStatus);
    const jobsData = useAppSelector(selectJobsData);
    const memoizedLoadingCheck = useCallback(
        () =>
            jobsStatus === 'loading' ||
            (jobsData.upcoming === null && jobsStatus === 'idle'),
        [jobsStatus, jobsData]
    );
    const [view, setView] = useState<'previous' | 'upcoming'>('upcoming');
    const [isLoading, setIsLoading] = useState(memoizedLoadingCheck());

    useEffect(() => {
        setIsLoading(memoizedLoadingCheck());
    }, [jobsStatus, memoizedLoadingCheck]);

    return (
        <>
            <Nav>
                <NavButton
                    isActive={view === 'previous'}
                    changeView={setView.bind(undefined, 'previous')}
                >
                    Previous
                </NavButton>
                <NavButton
                    isActive={view === 'upcoming'}
                    changeView={setView.bind(undefined, 'upcoming')}
                >
                    Upcoming
                </NavButton>
            </Nav>

            <Table isLoading={isLoading}>
                {/* Generating cleaning records */}
                {jobsData[view]?.map(singleLocation => (
                    <TableGroup key={singleLocation.uuid}>
                        {singleLocation.jobs?.map(
                            (
                                { uuid, type, date, hours, repetition, agent },
                                index
                            ) => (
                                <TableRecord
                                    key={uuid}
                                    address={
                                        index === 0
                                            ? singleLocation.location
                                            : undefined
                                    }
                                    type={type}
                                    dateAndTime={
                                        <>
                                            {date}
                                            <br />
                                            {hours}
                                        </>
                                    }
                                    repetition={repetition}
                                    agent={agent}
                                />
                            )
                        )}
                    </TableGroup>
                ))}
            </Table>
        </>
    );
}
