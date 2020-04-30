import React from 'react';

import "./Pagination.scss";
import Form from '../../layouts/Form';
import PaginationSector from './PaginationSector/PaginationSector';

import _ from 'lodash';

const MAX_PAGE_SEQUENCE = 3;

const Pagination = ({ className, pages = 0, page = 16, onChangePage = (page) => { } }) => {

    const middlePages = _.times(MAX_PAGE_SEQUENCE + 2, p => page + p - 2)
        .filter(p => (p > 0 && p <= pages));

    const leftPages = _.times(MAX_PAGE_SEQUENCE, p => p + 1)
        .filter((p, i) => i < 5 && (p > 0 && p <= pages && !middlePages.find(m => m < p || m === p)));
    const rightPages = _.times(MAX_PAGE_SEQUENCE, p => pages - 5 + p + 3)
        .filter((p, i) => i < 5 && (p > 0 && p <= pages && !middlePages.find(m => m > p || m === p)));


    const changePage = (p) => {
        if (p === page) return;
        onChangePage(p);
    }

    return (
        <Form className={`pagination ${className ?? ""}`}>
            <PaginationSector disabled={page === 1} className="pagination-sector-prev" value="<" onClick={() => changePage(page - 1)} />
            {leftPages?.map(p => <PaginationSector key={p} isCurrent={page === p} value={p} onClick={() => changePage(p)} />)}
            {leftPages.length !== 0 && <span>...</span>}

            {middlePages.map(p => <PaginationSector key={p} isCurrent={page === p} value={p} onClick={() => changePage(p)} />)}

            {rightPages.length !== 0 && <span>...</span>}
            {rightPages?.map(p => <PaginationSector key={p} isCurrent={page === p} value={p} onClick={() => changePage(p)} />)}
            <PaginationSector disabled={page >= pages} className="pagination-sector-next" value=">" onClick={() => changePage(page + 1)} />
        </Form>
    )
};

export default Pagination;