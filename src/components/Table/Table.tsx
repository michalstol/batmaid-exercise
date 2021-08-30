import React from 'react';

import TableGroup from '../TableGroup/TableGroup';
import SkeletonTableRecord from '../TableRecord/SkeletonTableRecord';

interface TableInterface {
    isLoading?: boolean;
    children: React.ReactNode;
}

export const testId = 'table';

export default function Table({
    isLoading,
    children,
}: TableInterface): React.ReactElement {
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

                {/* Skeleton loading */}
                {isLoading && (
                    <>
                        <TableGroup>
                            <SkeletonTableRecord />
                            <SkeletonTableRecord />
                        </TableGroup>
                        <TableGroup>
                            <SkeletonTableRecord />
                            <SkeletonTableRecord />
                        </TableGroup>
                    </>
                )}
                {!isLoading && children}
            </table>
        </main>
    );
}
