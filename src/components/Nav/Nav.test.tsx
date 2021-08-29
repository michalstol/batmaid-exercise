import { render, screen } from '@testing-library/react';

import Nav, { testId } from '.';

test('component -- Nav', () => {
    const content = 'Test content';

    render(<Nav>{content}</Nav>);
    const $nav = screen.getByTestId(testId);

    expect($nav).toBeInTheDocument();
    expect($nav).toHaveTextContent(content);
});
