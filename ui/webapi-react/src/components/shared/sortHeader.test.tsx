import { render, screen, fireEvent } from '@testing-library/react';

import { SortHeader } from "./sortHeader";

test('sort by field ascending', () => {
    const callback = jest.fn();
    let orderData = { OrderField: "OtherField", OrderDirection: "Desc" };

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
    expect(orderData.OrderField).toBe("ThisField");
    expect(orderData.OrderDirection).toBe("Asc");
    expect(callback).toHaveBeenCalled();
});

test('sort by field descending', () => {
    const callback = jest.fn();
    let orderData = { OrderField: "ThisField", OrderDirection: "Asc" };

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
    expect(orderData.OrderField).toBe("ThisField");
    expect(orderData.OrderDirection).toBe("Desc");
    expect(callback).toHaveBeenCalled();
});

test('sort by field cleard', () => {
    const callback = jest.fn();
    let orderData = { OrderField: "ThisField", OrderDirection: "Desc" };

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
    expect(orderData.OrderField).toBe("ThisField");
    expect(orderData.OrderDirection).toBe("None");
    expect(callback).toHaveBeenCalled();
});