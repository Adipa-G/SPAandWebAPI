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

    const toggleOrder = () => {
        if (!props.orderData) {
            return;
        }

        let fieldMatch: boolean = isFieldMatch();
        let field: string = orderField;
        let direction: string = orderDirection;

        if (!fieldMatch) {
            field = props.orderField;
            setOrderField(field);
            direction = 'Asc';

        } else {
            let asc: boolean = isAsc();
            let desc: boolean = isDesc();
            if (asc) {
                direction = 'Desc';
            } else if (desc) {
                direction = 'None';
            } else {
                direction = 'Asc';
            }
        }
        setOrderDirection(direction);

        props.orderData.orderField = field;
        props.orderData.orderDirection = direction;
        props.orderChanged();
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