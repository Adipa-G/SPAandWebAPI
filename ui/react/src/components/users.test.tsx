import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { CallbackFunction } from '../services/serviceModels';
import { UserModel, UserFilter } from '../services/userService';
import Users from './users'

const mockGetUsers = jest.fn();
const mockDeleteUser = jest.fn();
jest.mock('../services/userService', () => {
    return {
        UserService: function () {
            return {
                getUsers: mockGetUsers,
                deleteUser: mockDeleteUser
            };
        }
    }
});

beforeEach(() => {
    const users: UserModel[] = [{
        userName: 'a-user'
    },
    {
        userName: 'b-user'
    }];

    mockGetUsers.mockImplementation((filter: UserFilter, callback: CallbackFunction<UserModel[]>) => callback({ data: users, success: true, totalCount: 2, error: '' }));
    mockDeleteUser.mockImplementation((userName: string, callback: CallbackFunction<string>) => callback({ data: '', success: true, totalCount: 1, error: '' }));
});

test('load users success', async () => {
    render(<Users defaultPageSize={100} />);

    let rows = screen.getAllByTestId('user-row')

    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('a-user')
    expect(rows[1].textContent).toContain('b-user')
});

test('load users error', async () => {
    mockGetUsers.mockImplementation((filter: UserFilter, callback: CallbackFunction<UserModel[]>) => callback({ data: [], success: false, totalCount: 0, error: 'user error' }));

    render(<Users defaultPageSize={100} />);

    let error = screen.getByText('user error');

    expect(error).toHaveClass('alert-danger');
});

test('fetch data when sorted', async () => {
    render(<Users defaultPageSize={100} />);

    let userNameHeader = screen.getByText('UserName');
    fireEvent.click(userNameHeader);

    expect(mockGetUsers).toHaveBeenCalledTimes(2);
});

test('fetch data when paged', async () => {
    render(<Users defaultPageSize={1} />);

    let pageNumber = screen.getByText('2');
    fireEvent.click(pageNumber);

    expect(mockGetUsers).toHaveBeenCalledTimes(2);
});

test('delete user success', async () => {
    let confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));

    render(<Users defaultPageSize={100} />);

    let deleteButtons = screen.getAllByTestId('delete-user-btn')
    fireEvent.click(deleteButtons[0]);

    expect(mockDeleteUser).toHaveBeenCalledTimes(1);
    let rows = screen.getAllByTestId('user-row')

    expect(rows.length).toBe(1);
});

test('delete user error', async () => {
    let confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));

    mockDeleteUser.mockImplementation((userName: string, callback: CallbackFunction<string>) => callback({ data: '', success: false, totalCount: 0, error: 'delete error' }));

    render(<Users defaultPageSize={100} />);

    let deleteButtons = screen.getAllByTestId('delete-user-btn')
    fireEvent.click(deleteButtons[0]);

    let error = screen.getByText('delete error');
    expect(error).toHaveClass('alert-danger');
});