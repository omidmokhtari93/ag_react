import React, { Component } from "react";
import './Table.module.css'
import http from 'axios';
import Loading from '../Loading/Loading'
import Wrapper from "../../Shared/Wrapper/Wrapper";
import TablePagination from "./TablePagination/TablePagination";

class Table extends Component {
    state = {
        body: [],
        loading: false,
        colSpan: this.props.dataSource.header.length,
        loadingStyle: {
            width: "30px",
            height: 'auto'
        },
        allPages: 0,
        currentPage: 1
    }

    componentDidMount() {
        this.gotoPage(1)
    }

    fetchData = (currentPage) => {
        this.setState({ loading: true })
        let allowPagination = this.props.rowsInPage && this.props.allowPagination;
        http.get(this.props.url, {
            params: {
                rowsInpage: !allowPagination ? 0 : this.props.rowsInPage,
                pageNumber: currentPage
            }
        })
            .then(x => this.setState({ body: x.data.rows, allPages: x.data.pagesCount }))
    }

    createBody = e => {
        const serverDataLength = this.state.body.length;
        const body = this.props.dataSource.body;
        const tableBody = []
        for (let i = 0; i < serverDataLength; i++) {
            const td = body.map((x, idx) => <td key={idx}>{this.state.body[i][x]}</td>);
            tableBody.push(<tr key={i}>{td}</tr>)
        }
        return tableBody;
    }

    gotoPage = page => {
        this.fetchData(page)
        this.setState({ currentPage: page })
        console.log(page)
    }

    render() {
        return (
            <Wrapper>
                {this.props.allowSearch && <div className="table-search">
                    <span>جستجو</span>
                    <input type="text" />
                </div>}
                <table className="react-table">
                    <thead>
                        <tr>
                            {this.props.dataSource.header.map((x, idx) => {
                                return <th key={idx}>{x}</th>
                            })}
                        </tr>
                    </thead>
                    {!this.state.body.length
                        ? <tbody>
                            <tr>
                                <td colSpan={this.state.colSpan}>
                                    <Loading show={true}
                                        style={this.state.loadingStyle} />
                                </td>
                            </tr>
                        </tbody>
                        : (<Wrapper>
                            <tbody>
                                {this.createBody()}
                            </tbody>
                        </Wrapper>)}
                    <TablePagination
                        colSpan={this.state.colSpan}
                        pages={this.state.allPages}
                        gotoPage={this.gotoPage}
                        currentPage={this.state.currentPage} />
                </table>
            </Wrapper>
        )
    }
}

export default Table;