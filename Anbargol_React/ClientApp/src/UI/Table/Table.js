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
        colSpan: this.props.creationData.header.length,
        loadingStyle: {
            width: "30px",
            height: 'auto'
        },
        allPages: 0,
        currentPage: 1,
        keyword: ""
    }

    componentDidMount() {
        this.gotoPage(1)
    }

    fetchData = (currentPage, key) => {

        this.setState({ loading: true })
        let allowPagination = (this.props.rowsInPage && this.props.allowPagination);
        http.get(this.props.url, {
            params: {
                key: key,
                rowsInpage: allowPagination ? this.props.rowsInPage : 0,
                pageNumber: currentPage
            }
        }).then(x => this.setState({ body: x.data.rows, allPages: x.data.pagesCount, loading: false }))
    }

    createBody = e => {
        const serverDataLength = this.state.body.length;
        const body = this.props.creationData.body;
        const tableBody = []
        for (let i = 0; i < serverDataLength; i++) {
            const td = body.map((x, idx) => <td key={idx}>{this.state.body[i][x]}</td>);
            tableBody.push(<tr key={i}>{td}</tr>)
        }
        return tableBody;
    }

    gotoPage = page => {
        this.setState({ currentPage: page, keyword: "" })
        this.fetchData(page, '')
    }

    searchInTable = e => {
        e === 'Enter' && this.fetchData(1, this.state.keyword)
    }

    render() {
        return (
            <Wrapper>
                {this.props.allowSearch && <div className="table-search" onKeyPress={e => this.searchInTable(e.key)}>
                    <span>جستجو</span>
                    <input type="text" value={this.state.keyword}
                        onChange={e => this.setState({ keyword: e.target.value })} />
                </div>}
                <table className="react-table">
                    <thead>
                        <tr>
                            {this.props.creationData.header.map((x, idx) => {
                                return <th key={idx}>{x}</th>
                            })}
                        </tr>
                    </thead>
                    {!this.state.body.length
                        ? <tbody>
                            <tr>
                                <td colSpan={this.state.colSpan}>
                                    <Loading show={this.state.loading}
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