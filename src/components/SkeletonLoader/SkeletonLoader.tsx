import React from 'react';

import TableGroup from '../TableGroup/TableGroup';
import SkeletonTableRecord from './SkeletonTableRecord';

export default function SkeletonLoader() {
    return (
        <>
            <TableGroup>
                <SkeletonTableRecord />
                <SkeletonTableRecord />
            </TableGroup>
            <TableGroup>
                <SkeletonTableRecord />
                <SkeletonTableRecord />
            </TableGroup>
            <TableGroup>
                <SkeletonTableRecord />
                <SkeletonTableRecord />
            </TableGroup>
        </>
    );
}
