import React from 'react';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';

interface TableInterface {
    isLoading?: boolean;
    children: React.ReactNode;
}

export const testId = 'table';

export default function Table({
    isLoading,
    children,
}: TableInterface): JSX.Element {
    return (
        <main
            className={['cleanings', isLoading ? 'skeleton' : ''].join(' ')}
            data-testid={testId}
        >
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

                {isLoading ? <SkeletonLoader /> : children}
            </table>
        </main>
    );
}
