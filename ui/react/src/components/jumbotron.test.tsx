import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Jumbotron from './jumbotron'

test('render when auth', async () => {
    render(<Jumbotron isAuth={true} />);

    let title = await screen.queryAllByText('React/WebAPI Seed')

    expect(title.length).toBe(0);
});

test('render when no auth', async () => {
    render(<Jumbotron isAuth={false} />);

    let title = await screen.queryAllByText('React/WebAPI Seed')

    expect(title.length).toBe(1);
});
