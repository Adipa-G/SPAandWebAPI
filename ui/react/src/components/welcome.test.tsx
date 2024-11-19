import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Welcome from './welcome'

test('render when user', async () => {
    render(<Welcome userName='__user__' />);

    let title = await screen.queryAllByText('Welcome __user__')

    expect(title.length).toBe(1);
});

test('render when no user', async () => {
    render(<Welcome userName='' />);

    let title = await screen.queryAllByText('Welcome')

    expect(title.length).toBe(0);
});
