import React from 'react';

interface TableGroupInterface {
    children: React.ReactNode;
}

export const testId = 'table-group';

export default function TableGroup({
    children,
}: TableGroupInterface): React.ReactElement {
    return (
        <tbody className="cleanings__group" data-testid={testId}>
            {children}
        </tbody>
    );
}
