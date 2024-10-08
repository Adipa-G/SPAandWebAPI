import * as React from "react";

export interface SortHeaderProps {
    headerText: string,
    orderData: any,
    orderField: string,
    orderChanged: Function
}

export interface SortHeaderState { direction: string }

export class SortHeader extends React.Component<SortHeaderProps, SortHeaderState> {

    constructor(props: SortHeaderProps) {
        super(props);

        this.state = { direction: this.props.orderData.OrderDirection };
    }

    isFieldMatch = (): boolean => {
        return this.props.orderField &&
            this.props.orderData.OrderField &&
            this.props.orderField.toLowerCase() === this.props.orderData.OrderField.toLowerCase();
    }

    isAsc = (): boolean => {
        return this.props.orderData.OrderDirection === 'Asc';
    }

    isDesc = (): boolean => {
        return this.props.orderData.OrderDirection === 'Desc';
    }

    toggleOrder = () => {
        if (!this.props.orderData) {
            return;
        }

        let fieldMatch: boolean = this.isFieldMatch();

        if (!fieldMatch) {
            this.props.orderData.OrderField = this.props.orderField;
            this.props.orderData.OrderDirection = 'Asc';
        } else {
            let asc: boolean = this.isAsc();
            let desc: boolean = this.isDesc();
            if (asc) {
                this.props.orderData.OrderDirection = 'Desc';
            }
            else if (desc) {
                this.props.orderData.OrderDirection = 'None';
            } else {
                this.props.orderData.OrderDirection = 'Asc';
            }
        }

        this.setState((prevState: SortHeaderState) => {
            let newState: SortHeaderState = { ...prevState };
            newState.direction = this.props.orderData.OrderDirection;
            return newState;
        });

        this.props.orderChanged();
    }

    render() {
        let fieldMatch: boolean = this.isFieldMatch();
        let asc: boolean = this.isAsc();
        let desc: boolean = this.isDesc();

        var sortIndicator = <span></span>;
        if (fieldMatch && asc) {
            sortIndicator = <i className="pull-right fa fa-sort-alpha-asc"></i>;
        }
        if (fieldMatch && desc) {
            sortIndicator = <i className="pull-right fa fa-sort-alpha-desc"></i>;
        }

        return <th className="sort-table-header" onClick={() => this.toggleOrder()}>
            {this.props.headerText}
            {sortIndicator}
        </th>;
    }
}