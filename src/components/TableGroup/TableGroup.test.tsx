import { render, screen } from '@testing-library/react';

import TableGroup, { testId } from './TableGroup';

test('component -- TableGroup', () => {
    render(
        <table>
            <TableGroup>
                <tr>
                    <td>Test content</td>
                </tr>
            </TableGroup>
        </table>
    );
    const $tableGroup = screen.getByTestId(testId);

    expect($tableGroup).toBeInTheDocument();
    expect($tableGroup).toHaveTextContent(/Test content/);
});
