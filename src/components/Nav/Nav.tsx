import React from 'react';

interface NavInterface {
    children: React.ReactNode;
}

export const testId = 'nav';

export default function Nav({ children }: NavInterface): JSX.Element {
    return (
        <nav className="nav" data-testid={testId}>
            <ul className="nav__list">{children}</ul>
        </nav>
    );
}
