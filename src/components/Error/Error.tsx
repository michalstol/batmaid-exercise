import React from 'react';

export const testId = 'error';

export default function Error(): React.ReactElement {
    return <div className="error-fallback">Data fetching failed!</div>;
}
