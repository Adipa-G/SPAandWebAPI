import * as React from "react";

declare var Math: any;

export interface TablePagerProps {
    totalCount: number,
    pageData: any,
    pageChanged: Function
}

export interface TablePagerState { page: number }

export class TablePager extends React.Component<TablePagerProps, TablePagerState> {

    constructor(props: TablePagerProps) {
        super(props);

        this.state = { page: this.props.pageData.PageNumber };
    }

    pageCount = (): number => {
        return Math.ceil(this.props.totalCount / this.props.pageData.PageSize);
    }

    startPage = (): number => {
        var pageCount = this.pageCount();
        let startPage: number = this.state.page - 2;
        startPage = startPage + 4 > pageCount ? pageCount - 4 : startPage;
        startPage = startPage < 1 ? 1 : startPage;
        return startPage;
    }

    endPage = (): number => {
        var pageCount = this.pageCount();
        pageCount = pageCount > 5 ? 5 : pageCount;
        return this.startPage() + pageCount - 1;
    }

    isPreviousEnabled = (): boolean => {
        return this.state.page > 1;
    }

    isNextEnabled = (): boolean => {
        return this.state.page < this.pageCount();
    }

    changePage = (pageNumber: number) => {
        if (!this.props.pageData) {
            return;
        }

        this.props.pageData.PageNumber = pageNumber;

        this.setState((prevState: TablePagerState) => {
            let newState: TablePagerState = { ...prevState };
            newState.page = pageNumber;
            return newState;
        });

        this.props.pageChanged();
    }

    render() {
        let startPage: number = this.startPage();
        let endPage: number = this.endPage();
        let isPreviousEnabled: boolean = this.isPreviousEnabled();
        let isNextEnabled: boolean = this.isNextEnabled();

        let pages: Array<any> = [];
        for (var i = 0; i <= (endPage - startPage); i++) {
            let iCopy = i;
            var page = <li key={iCopy} className={startPage + iCopy === this.state.page ? "active" : ""}>
                <a href={startPage + iCopy <= endPage ? "#" : ''}
                    onClick={() => startPage + iCopy <= endPage ? this.changePage(startPage + iCopy) : () => false}>
                    {startPage + iCopy}
                </a>
            </li>;
            pages.push(page);
        }

        return <nav>
            <ul className="pagination">
                <li>
                    <a aria-label="Previous"
                        href={isPreviousEnabled ? "#" : ''}
                        onClick={() => isPreviousEnabled ? this.changePage(this.state.page - 1) : () => false}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pages}
                <li>
                    <a aria-label="Next"
                        href={isNextEnabled ? "#" : ''}
                        onClick={() => isNextEnabled ? this.changePage(this.state.page + 1) : () => false}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>;
    }
}