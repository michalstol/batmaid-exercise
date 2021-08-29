import React from 'react';
import { RepetitionType } from '../../api/jobsInterface';

interface TableRecordInterface {
    address?: string;
    type: string;
    dateAndTime: React.ReactNode;
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
}: TableRecordInterface): React.ReactElement {
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
