import reducer, { initialState } from './jobsSlice';

test('redux -- jobsSlice reducer', () => {
    expect(reducer(undefined, { type: null })).toEqual({ ...initialState });
});
