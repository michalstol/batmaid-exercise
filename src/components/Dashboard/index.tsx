import React, { useState } from 'react';

import { useAppSelector } from '../../app/hooks';
import { selectJobsData } from '../../api/jobsSlice';

import Nav from '../Nav';
import NavButton from '../NavButton';
import Table from '../Table';
import TableGroup from '../TableGroup';
import TableRecord from '../TableRecord';

export default function Dashboard(): React.ReactElement {
    const jobsData = useAppSelector(selectJobsData);
    const [view, setView] = useState<'previous' | 'upcoming'>('upcoming');

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

            <Table>
                {jobsData?.map(singleLocation => (
                    <TableGroup key={singleLocation.uuid}>
                        {singleLocation[
                            view === 'upcoming'
                                ? 'upcomingJobs'
                                : 'previousJobs'
                        ]?.map(
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
