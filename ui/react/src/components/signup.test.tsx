import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { CallbackFunction } from '../services/serviceModels';
import SignUp from './signup'

const mockSignup = jest.fn();
jest.mock('../services/authService', () => {
    return {
        AuthService: function () {
            return {
                signup: mockSignup
            };
        }
    }
});

test('signup with no username or password', async () => {
    render(<SignUp signupComplete={() => { }} />);

    let registerButton = screen.getByTestId('register-button');
    fireEvent.click(registerButton);

    let error = screen.getByText('Please enter a username and password');
    expect(error).toHaveClass('alert-danger');
});

test('signup with short username', async () => {
    render(<SignUp signupComplete={() => { }} />);

    let userNameInput = screen.getByTestId('registrationUserName');
    fireEvent.change(userNameInput, { target: { value: 'us' } });

    let passwordInput = screen.getByTestId('registrationPassword');
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    let registerButton = screen.getByTestId('register-button');
    fireEvent.click(registerButton);

    let error = screen.getByText('Username should be at least 3 characters long');
    expect(error).toHaveClass('alert-danger');
});

test('signup with short password', async () => {
    render(<SignUp signupComplete={() => { }} />);

    let userNameInput = screen.getByTestId('registrationUserName');
    fireEvent.change(userNameInput, { target: { value: 'user' } });

    let passwordInput = screen.getByTestId('registrationPassword');
    fireEvent.change(passwordInput, { target: { value: 'pwd' } });

    let registerButton = screen.getByTestId('register-button');
    fireEvent.click(registerButton);

    let error = screen.getByText('Password should be at least 6 characters long');
    expect(error).toHaveClass('alert-danger');
});

test('signup with incorrect confirmed password', async () => {
    render(<SignUp signupComplete={() => { }} />);

    let userNameInput = screen.getByTestId('registrationUserName');
    fireEvent.change(userNameInput, { target: { value: 'user' } });

    let passwordInput = screen.getByTestId('registrationPassword');
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    let confirmPasswordInput = screen.getByTestId('registrationConfirmPassword');
    fireEvent.change(confirmPasswordInput, { target: { value: 'pwd' } });

    let registerButton = screen.getByTestId('register-button');
    fireEvent.click(registerButton);

    let error = screen.getByText('Passwords should match.');
    expect(error).toHaveClass('alert-danger');
});

test('signup error', async () => {
    const mockSignupCallback = jest.fn();
    mockSignup.mockImplementation((userName: string, password: string, callback: CallbackFunction) => callback({ data: [], success: false, totalCount: 0, error: 'registration error' }));
    render(<SignUp signupComplete={mockSignupCallback} />);

    let userNameInput = screen.getByTestId('registrationUserName');
    fireEvent.change(userNameInput, { target: { value: 'user' } });

    let passwordInput = screen.getByTestId('registrationPassword');
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    let confirmPasswordInput = screen.getByTestId('registrationConfirmPassword');
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    let registerButton = screen.getByTestId('register-button');
    fireEvent.click(registerButton);

    let error = screen.getByText('error while registering :registration error');
    expect(error).toHaveClass('alert-danger');
    expect(mockSignupCallback).not.toBeCalled();
});

test('signup success', async () => {
    const mockSignupCallback = jest.fn();
    mockSignup.mockImplementation((userName: string, password: string, callback: CallbackFunction) => callback({ data: [], success: true, totalCount: 0, error: '' }));
    render(<SignUp signupComplete={mockSignupCallback} />);

    let userNameInput = screen.getByTestId('registrationUserName');
    fireEvent.change(userNameInput, { target: { value: 'user' } });

    let passwordInput = screen.getByTestId('registrationPassword');
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    let confirmPasswordInput = screen.getByTestId('registrationConfirmPassword');
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    let registerButton = screen.getByTestId('register-button');
    fireEvent.click(registerButton);

    let error = screen.getByText('Registration successful!');
    expect(error).toHaveClass('alert-success');
    expect(mockSignupCallback).toBeCalled();
});