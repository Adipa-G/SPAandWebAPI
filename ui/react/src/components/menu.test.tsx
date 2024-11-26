import { render, fireEvent, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

import Menu from './menu'

test('render when not logged in', async () => {
    render(<BrowserRouter><Menu isAuth={false} logOff={() => { }} /></BrowserRouter>);

    var loginMenu = screen.queryAllByText('Login');
    var signUpMenu = screen.queryAllByText('Sign up');
    var usersMenu = screen.queryAllByText('Users');

    expect(loginMenu.length).toBe(1);
    expect(signUpMenu.length).toBe(1);
    expect(usersMenu.length).toBe(0);
});

test('render when logged in', async () => {
    render(<BrowserRouter><Menu isAuth={true} logOff={() => { }} /></BrowserRouter>);

    var usersMenu = screen.queryAllByText('Users');
    var sysLogMenu = screen.queryAllByText('System Log');
    var httpLogMenu = screen.queryAllByText('Http Log');
    var logoutMenu = screen.queryAllByText('Logout');
    var loginMenu = screen.queryAllByText('Login');

    expect(usersMenu.length).toBe(1);
    expect(sysLogMenu.length).toBe(1);
    expect(httpLogMenu.length).toBe(1);
    expect(logoutMenu.length).toBe(1);
    expect(loginMenu.length).toBe(0);
});

test('call logout when logout menu clicked', async () => {
    const mockLogOff = jest.fn();
    render(<BrowserRouter><Menu isAuth={true} logOff={mockLogOff} /></BrowserRouter>);

    var logoutMenu = screen.getByText('Logout');
    fireEvent.click(logoutMenu);

    expect(mockLogOff).toBeCalled();
});