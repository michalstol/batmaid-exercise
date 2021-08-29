import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NavButton, { testId } from '.';

test('component -- NavButton', () => {
    const content = 'Test label';
    const testEvent = () => {};

    render(
        <NavButton isActive={false} changeView={testEvent}>
            {content}
        </NavButton>
    );
    const $navButton = screen.getByTestId(testId);

    expect($navButton).toBeInTheDocument();
    expect($navButton).toHaveTextContent(content);
});

test('component -- NavButton -- event', () => {
    let testValue = 0;
    const changeValue = () => {
        testValue = 1;
    };

    render(
        <NavButton isActive={false} changeView={changeValue}>
            Content
        </NavButton>
    );
    const $navButton = screen.getByTestId(testId);

    userEvent.click($navButton);

    expect(testValue).toEqual(1);
});
