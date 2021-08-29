import { render, screen } from '@testing-library/react';

import TableRecord, { testId } from '.';

test('component -- TableRecord', () => {
    render(
        <table>
            <tbody>
                <TableRecord
                    address="Foo"
                    type="type"
                    dateAndTime={<>data and time</>}
                    repetition="Weekly"
                    agent="Test name"
                />
            </tbody>
        </table>
    );
    const $tableRecord = screen.getByTestId(testId);

    expect($tableRecord).toBeInTheDocument();
    expect($tableRecord).toHaveTextContent(/Test name/);
});
