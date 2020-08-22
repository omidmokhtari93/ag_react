import React, { Component } from "react";
import './Table.module.css'
import http from 'axios';
import Loading from '../Loading/Loading'
import Wrapper from "../../Shared/Wrapper/Wrapper";

class Table extends Component {
    state = {
        body: [],
        loading: false,
        colSpan: this.props.dataSource.header.length,
        loadingStyle: {
            width: "30px",
            height: 'auto'
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        // this.setState({ loading: true })
        // http.get('http://2.180.37.75/anbargol/api/getall?id=1485')
        //     .then(x => this.setState({ body: x.data }))
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

    render() {

        return (
            <Wrapper>
                <div className="table-search">
                    <as
                    <input type="text" />
                </div>
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
                </table>
            </Wrapper>
        )
    }
}

export default Table;