import React from 'react';

export const testId = 'skeleton-table-record';

export default function TableRecord(): JSX.Element {
    return (
        <tr data-testid={testId}>
            <td></td>
            <td></td>
            <td>
                &nbsp;
                <br />
                &nbsp;
            </td>
            <td></td>
            <td></td>
        </tr>
    );
}
