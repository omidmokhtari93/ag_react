import React from 'react';
import './TablePagination.module.css';

const TablePagination = props => {
    const pages = props.pages;
    const currentPage = props.currentPage;
    return (
        <tbody className="table-pagination">
            <tr>
                <td colSpan={props.colSpan}>
                    <button disabled={currentPage == 1} onClick={() => props.gotoPage(1)}>{'>>'}</button>
                    <button disabled={currentPage == 1} onClick={() => props.gotoPage(currentPage - 1)}>{'>'}</button>
                    <span>{currentPage}</span>
                    <button disabled={currentPage == pages} onClick={() => props.gotoPage(currentPage + 1)}>{'<'}</button>
                    <button disabled={currentPage == pages} onClick={() => props.gotoPage(pages)}>{'<<'}</button>
                    <label>{props.pages} : تعداد کل صفحات</label>
                </td>
            </tr>
        </tbody>
    )
}

export default TablePagination;