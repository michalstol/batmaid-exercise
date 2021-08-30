import React from 'react';
import { RepetitionType } from '../../api/jobsInterface';

interface TableRecordInterface {
    address?: string;
    type: string;
    dateAndTime: JSX.Element;
    repetition: RepetitionType;
    agent: string;
}

export const testId = 'table-record';

export default function TableRecord({
    address = '',
    type,
    dateAndTime,
    repetition,
    agent,
}: TableRecordInterface): JSX.Element {
    return (
        <tr data-testid={testId}>
            <td>{address}</td>
            <td>{type}</td>
            <td>{dateAndTime}</td>
            <td>{repetition}</td>
            <td>{agent}</td>
        </tr>
    );
}
