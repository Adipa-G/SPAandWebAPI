import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { CallbackFunction } from '../services/serviceModels';
import Login from './login'

const mockAuthenticate = jest.fn();
jest.mock('../services/authService', () => {
    return {
        AuthService: function () {
            return {
                authenticate: mockAuthenticate
            };
        }
    }
});

test('login with no username or password', async () => {
    render(<Login loginComplete={() => { }} />);

    let loginButton = screen.getByTestId('login-button');
    fireEvent.click(loginButton);

    let error = screen.getByText('Please enter a username and password');
    expect(error).toHaveClass('alert-danger');
});

test('login invalid credentials', async () => {
    const mockLoginCallback = jest.fn();
    mockAuthenticate.mockImplementation((userName: string, password: string, callback: CallbackFunction) => callback({ data: [], success: false, totalCount: 0, error: 'invalid credentials' }));
    render(<Login loginComplete={mockLoginCallback} />);

    let userNameInput = screen.getByTestId('loginUserName');
    fireEvent.change(userNameInput, { target: { value: 'us' } });

    let passwordInput = screen.getByTestId('loginPassword');
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    let loginButton = screen.getByTestId('login-button');
    fireEvent.click(loginButton);

    let error = screen.getByText('Invalid credentials. Please try again.');
    expect(error).toHaveClass('alert-danger');
    expect(mockLoginCallback).not.toBeCalled();
});

test('login with valid credentials', async () => {
    const mockLoginCallback = jest.fn();
    mockAuthenticate.mockImplementation((userName: string, password: string, callback: CallbackFunction) => callback({ data: [], success: true, totalCount: 0, error: 'success login' }));
    render(<Login loginComplete={mockLoginCallback} />);

    let userNameInput = screen.getByTestId('loginUserName');
    fireEvent.change(userNameInput, { target: { value: 'us' } });

    let passwordInput = screen.getByTestId('loginPassword');
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    let loginButton = screen.getByTestId('login-button');
    fireEvent.click(loginButton);

    expect(mockLoginCallback).toBeCalled();
});