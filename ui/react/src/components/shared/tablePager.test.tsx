import { render, screen, fireEvent } from '@testing-library/react';

import { PageData } from '../../services/serviceModels';
import TablePager from "./tablePager";

test('renders the pager', () => {
    let pageData: PageData = { pageSize: 10, pageNumber: 5 };
    render(<TablePager
        totalCount={100}
        pageData={pageData}
        pageChanged={() => { }} />);

    var previous = screen.getByLabelText('Previous');
    var page3 = screen.getByText('3');
    var page4 = screen.getByText('4');
    var page5 = screen.getByText('5');
    var page6 = screen.getByText('6');
    var page7 = screen.getByText('7');
    var next = screen.getByLabelText('Next');

    expect(previous).toBeInTheDocument();
    expect(page3).toBeInTheDocument();
    expect(page4).toBeInTheDocument();
    expect(page5).toBeInTheDocument();
    expect(page6).toBeInTheDocument();
    expect(page7).toBeInTheDocument();
    expect(next).toBeInTheDocument();
});

test('go to previous page', () => {
    const callback = jest.fn();
    let pageData: PageData = { pageSize: 10, pageNumber: 5 };

    render(<TablePager
        totalCount={100}
        pageData={pageData}
        pageChanged={callback} />);

    var previous = screen.getByLabelText('Previous');
    fireEvent(
        previous,
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }),
    )

    expect(pageData.pageNumber).toBe(4);
    expect(callback).toHaveBeenCalled();
});

test('go to page', () => {
    const callback = jest.fn();
    let pageData: PageData = { pageSize: 10, pageNumber: 5 };

    render(<TablePager
        totalCount={100}
        pageData={pageData}
        pageChanged={callback} />);

    var page7 = screen.getByText('7');
    fireEvent(
        page7,
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }),
    )

    expect(pageData.pageNumber).toBe(7);
    expect(callback).toHaveBeenCalled();
});

test('go to next page', () => {
    const callback = jest.fn();
    let pageData: PageData = { pageSize: 10, pageNumber: 5 };

    render(<TablePager
        totalCount={100}
        pageData={pageData}
        pageChanged={callback} />);

    var previous = screen.getByLabelText('Next');
    fireEvent(
        previous,
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }),
    )

    expect(pageData.pageNumber).toBe(6);
    expect(callback).toHaveBeenCalled();
});