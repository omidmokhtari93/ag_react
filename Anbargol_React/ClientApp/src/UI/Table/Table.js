import React, { Component } from "react";
import './Table.module.css'
import http from 'axios';
import Loading from '../Loading/Loading'
import Wrapper from "../../Shared/Wrapper/Wrapper";
import TablePagination from "./TablePagination/TablePagination";
import TableSearch from "./TableSearch/TableSearch";

class Table extends Component {
    state = {
        body: [],
        loading: false,
        colSpan: this.props.creationData.header.length + (this.props.buttons ? Object.keys(this.props.buttons).length : 0),
        loadingStyle: {
            width: "30px",
            height: 'auto'
        },
        allPages: 0,
        currentPage: 1,
        keyword: "",
        url: this.props.url
    }

    componentDidMount() {
        this.gotoPage(1)
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.url != nextProps.url) {
            this.setState({ url: nextProps.url }, () => {
                this.gotoPage(1)
            })
        }
    }

    fetchData = (currentPage, key) => {
        this.setState({ loading: true })
        let allowPagination = (this.props.rowsInPage > 0 && this.props.allowPagination);
        this.state.url != "" &&
            http.get(this.state.url, {
                params: {
                    key: key,
                    rowsInpage: allowPagination ? this.props.rowsInPage : 0,
                    pageNumber: currentPage
                }
            }).then(x => {
                this.setState({ body: [...x.data.rows], allPages: x.data.pagesCount, loading: false })
            })
    }

    createBody = e => {
        const serverDataLength = this.state.body.length;
        const body = this.props.creationData.body;
        const tableBody = []
        for (let i = 0; i < serverDataLength; i++) {
            const td = body.map((x, idx) => <td key={idx}>{this.state.body[i][x]}</td>);
            const buttons = this.props.buttons && Object.keys(this.props.buttons).map(btn => {
                return <td key={btn + i}>
                    <a onClick={() => this.props.tableClick(btn, this.state.body[i])}>
                        {this.props.buttons[btn]}
                    </a>
                </td>
            })
            tableBody.push(<tr key={i}>{td}{buttons}</tr>)
        }
        return tableBody;
    }

    gotoPage = (page) => {
        this.setState({ currentPage: page, keyword: "" })
        this.fetchData(page, '')
    }

    render() {
        return (
            <Wrapper>
                <TableSearch enable={this.props.allowSearch}
                    handleRequest={this.fetchData} />
                <div className="table-responsive">
                    <table className="react-table">
                        <thead>
                            <tr>
                                {this.props.creationData.header.map((x, idx) => {
                                    return <th key={idx}>{x}</th>
                                })}
                                {this.props.buttons && Object.keys(this.props.buttons).map(x => <th key={x + 100}></th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {!this.state.body.length
                                ? (<tr>
                                    <td colSpan={this.state.colSpan}>
                                        <Loading show={this.state.loading}
                                            style={this.state.loadingStyle} />
                                    </td>
                                </tr>)
                                : this.createBody()
                            }
                        </tbody>
                        {this.props.allowPagination && <TablePagination
                            colSpan={this.state.colSpan}
                            pages={this.state.allPages}
                            gotoPage={this.gotoPage}
                            currentPage={this.state.currentPage} />}
                    </table>
                </div>
            </Wrapper>
        )
    }
}

export default Table;