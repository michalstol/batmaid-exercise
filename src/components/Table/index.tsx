import React from 'react';

interface TableInterface {
    children: React.ReactNode;
}

export const testId = 'table';

export default function Table({
    children,
}: TableInterface): React.ReactElement {
    return (
        <main className="cleanings" data-testid={testId}>
            <table className="cleanings__table">
                <thead className="cleanings__head">
                    <tr>
                        <th>Address</th>
                        <th>Type</th>
                        <th>Date &amp; time</th>
                        <th>Repetition</th>
                        <th>Batmaid</th>
                    </tr>
                </thead>

                {children}
            </table>
        </main>
    );
}
