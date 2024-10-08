import { render, screen } from '@testing-library/react';

import { SuccessMessage } from "./successMessage";

test('render success message', () => {
    render(<SuccessMessage successMessage='__msg__' />);

    const message = screen.getByText('__msg__');

    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('alert');
    expect(message).toHaveClass('alert-success');
});