import { render, screen, fireEvent } from '@testing-library/react';

import SortHeader from "./sortHeader";

test('sort by field ascending', () => {
    const callback = jest.fn();
    let orderData = { orderField: "OtherField", orderDirection: "Desc" };

    render(<table><thead><tr><SortHeader
        headerText="__header__"
        orderData={orderData}
        orderField="ThisField"
        orderChanged={callback} /></tr></thead></table>);

    const header = screen.getByText("__header__");

    fireEvent(
        header,
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }),
    )

    expect(header).toContainHTML('fa-sort-alpha-asc')
    expect(orderData.orderField).toBe("ThisField");
    expect(orderData.orderDirection).toBe("Asc");
    expect(callback).toHaveBeenCalled();
});

test('sort by field descending', () => {
    const callback = jest.fn();
    let orderData = { orderField: "ThisField", orderDirection: "Asc" };

    render(<table><thead><tr><SortHeader
        headerText="__header__"
        orderData={orderData}
        orderField="ThisField"
        orderChanged={callback} /></tr></thead></table>);

    const header = screen.getByText("__header__");

    fireEvent(
        header,
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }),
    )

    expect(header).toContainHTML('fa-sort-alpha-desc')
    expect(orderData.orderField).toBe("ThisField");
    expect(orderData.orderDirection).toBe("Desc");
    expect(callback).toHaveBeenCalled();
});

test('sort by field cleard', () => {
    const callback = jest.fn();
    let orderData = { orderField: "ThisField", orderDirection: "Desc" };

    render(<table><thead><tr><SortHeader
        headerText="__header__"
        orderData={orderData}
        orderField="ThisField"
        orderChanged={callback} /></tr></thead></table>);

    const header = screen.getByText("__header__");

    fireEvent(
        header,
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }),
    )

    expect(header).not.toContainHTML('fa-sort-alpha-asc')
    expect(header).not.toContainHTML('fa-sort-alpha-desc')
    expect(orderData.orderField).toBe("ThisField");
    expect(orderData.orderDirection).toBe("None");
    expect(callback).toHaveBeenCalled();
});