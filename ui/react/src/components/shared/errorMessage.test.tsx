import { render, screen } from '@testing-library/react';
import ErrorMessage from './errorMessage';

test('renders error message', () => {
    render(<ErrorMessage errorMessage='__msg__' />);

    const messageElement = screen.getByText("__msg__");

    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('alert');
    expect(messageElement).toHaveClass('alert-danger');
});