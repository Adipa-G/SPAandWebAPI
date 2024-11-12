import { useState, useEffect } from "react";

import { PageData } from "../../services/serviceModels";

declare var Math: any;

export interface TablePagerProps {
    totalCount: number,
    pageData: PageData,
    pageChanged: Function
}

const TablePager = (props: TablePagerProps) => {
    const [pageNumber, setPageNumber] = useState(props.pageData.pageNumber);

    const pageCount = (): number => {
        return Math.ceil(props.totalCount / props.pageData.pageSize);
    };

    const startPage = (): number => {
        let pages = pageCount();
        let startPage: number = pageNumber - 2;
        startPage = startPage + 4 > pages ? pages - 4 : startPage;
        startPage = startPage < 1 ? 1 : startPage;
        return startPage;
    };

    const endPage = (): number => {
        var pages = pageCount();
        pages = pages > 5 ? 5 : pages;
        return startPage() + pages - 1;
    }

    const isPreviousEnabled = (): boolean => {
        return pageNumber > 1;
    }

    const isNextEnabled = (): boolean => {
        return pageNumber < pageCount();
    }

    const changePage = (page: number) => {
        if (!props.pageData) {
            return;
        }
        setPageNumber(page);
    };

    useEffect(() => {
        if (props.pageData.pageNumber !== pageNumber) {
            props.pageData.pageNumber = pageNumber;
            props.pageChanged();
        }
    });

    let start: number = startPage();
    let end: number = endPage();
    let previousEnabled: boolean = isPreviousEnabled();
    let nextEnabled: boolean = isNextEnabled();

    let pages: Array<any> = [];
    for (var i = 0; i <= (end - start); i++) {
        let iCopy = i;
        var page = <li key={iCopy} className={start + iCopy === pageNumber ? "active" : ""}>
            <button className="pagination-button" onClick={() => start + iCopy <= end ? changePage(start + iCopy) : () => false}>
                {start + iCopy}
            </button>
        </li>;
        pages.push(page);
    }

    return <nav>
        <ul className="pagination">
            <li>
                <button className="pagination-button" aria-label="Previous"
                    onClick={() => previousEnabled ? changePage(pageNumber - 1) : () => false}>
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>
            {pages}
            <li>
                <button className="pagination-button" aria-label="Next"
                    onClick={() => nextEnabled ? changePage(pageNumber + 1) : () => false}>
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>
        </ul>
    </nav>;
};

export default TablePager;