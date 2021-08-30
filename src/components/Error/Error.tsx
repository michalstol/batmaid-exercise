import React from 'react';

export const testId = 'error';

export default function Error(): JSX.Element {
    return <div className="error-fallback">Data fetching failed!</div>;
}
