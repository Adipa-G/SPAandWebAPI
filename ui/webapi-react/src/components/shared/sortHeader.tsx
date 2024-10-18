import { useState, useEffect } from "react";

import { OrderData } from "../../services/serviceModels";

export interface SortHeaderProps {
    headerText: string,
    orderData: OrderData,
    orderField: string,
    orderChanged: Function
}

const SortHeader = (props: SortHeaderProps) => {
    const [orderDirection, setOrderDirection] = useState(props.orderData.orderDirection);
    const [orderField, setOrderField] = useState(props.orderData.orderField);

    const isFieldMatch = (): boolean => {
        return !!props.orderField &&
            !!orderField &&
            props.orderField.toLowerCase() === orderField.toLowerCase();
    };

    const isAsc = (): boolean => {
        return orderDirection === 'Asc';
    };

    const isDesc = (): boolean => {
        return orderDirection === 'Desc';
    };

    useEffect(() => {
        if (props.orderData.orderField != orderField ||
            props.orderData.orderDirection != orderDirection) {
            props.orderData.orderField = orderField;
            props.orderData.orderDirection = orderDirection;
            props.orderChanged();
        }
    });

    const toggleOrder = () => {
        if (!props.orderData) {
            return;
        }

        let fieldMatch: boolean = isFieldMatch();

        if (!fieldMatch) {
            setOrderField(props.orderField);
            setOrderDirection('Asc');
        } else {
            let asc: boolean = isAsc();
            let desc: boolean = isDesc();
            if (asc) {
                setOrderDirection('Desc');
            } else if (desc) {
                setOrderDirection('None');
            } else {
                setOrderDirection('Asc');
            }
        }
    };

    let fieldMatch: boolean = isFieldMatch();
    let asc: boolean = isAsc();
    let desc: boolean = isDesc();

    var sortIndicator = <span></span>;
    if (fieldMatch && asc) {
        sortIndicator = <i className="pull-right fa fa-sort-alpha-asc"></i>;
    }
    if (fieldMatch && desc) {
        sortIndicator = <i className="pull-right fa fa-sort-alpha-desc"></i>;
    }

    return (
        <th className="sort-table-header" onClick={() => toggleOrder()}>
            {props.headerText}
            {sortIndicator}
        </th>
    );
};

export default SortHeader;