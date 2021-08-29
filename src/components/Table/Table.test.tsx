import { render, screen } from '@testing-library/react';

import Table, { testId } from '.';

test('component -- Table', () => {
    render(
        <Table>
            {
                <tbody>
                    <tr>
                        <td>Test content</td>
                    </tr>
                </tbody>
            }
        </Table>
    );
    const $table = screen.getByTestId(testId);

    expect($table).toBeInTheDocument();
    expect($table).toHaveTextContent(/Test content/);
});
