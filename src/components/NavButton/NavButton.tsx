import React from 'react';

interface NavButtonInterface {
    isActive: boolean;
    changeView: () => void;
    children: React.ReactNode;
}

export const testId = 'nav-button';

export default function NavButton({
    isActive,
    changeView,
    children,
}: NavButtonInterface): React.ReactElement {
    return (
        <li className="nav__el">
            <button
                className={['nav-button', isActive ? 'active' : ''].join(' ')}
                onClick={changeView}
                data-testid={testId}
            >
                {children}
            </button>
        </li>
    );
}
