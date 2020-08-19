import React, { Component } from 'react';
import './SearchBox.module.css';
import searcIcon from '../../Assets/images/search.png'
import Loading from '../Loading/Loading';
import http from 'axios';

class SearchBoxNoRedux extends Component {
    state = {
        timeOut: null,
        loading: false,
        result: []
    }
    searchBoxRef = React.createRef();

    componentDidMount() {
        document.addEventListener('click', (e) => {
            !this.searchBoxRef.current.contains(e.target) && this.setState({ result: [], loading: false })
        })
    }

    componentWillUnmount() {
        document.removeEventListener('click');
    }

    handleSearch = value => {
        clearTimeout(this.state.timeOut)
        this.setState({ result: [], loading: true })
        this.state.timeOut = setTimeout(() => {
            if (value.trim()) {
                this.handleApiReq(value).then(x => {
                    this.setState({ result: this.state.result.concat(x.data), loading: false })
                })
            }
        }, 1000);
    }

    handleApiReq = value => {
        const obj = {};
        this.props.reqParam.map(x => obj[x] = value)
        return http.get(this.props.url, {
            params: obj
        })
    }

    showReport = (name, id) => {
        this.props.handleResponse({ name: name, id: id })
    }

    createDropdown = obj => {
        const items = this.state.result.map(obj => {
            return { name: this.props.resParam.map(key => obj[key]).join(' / '), id: obj[this.props.id] }
        })
        return items.map((item, index) => {
            return <li key={index} onClick={() => this.showReport(item.name, item.id)}>{item.name}</li>
        })
    }

    render() {
        return (
            <div className="search-box light-sans" ref={this.searchBoxRef}
                style={this.props.width
                    ? { width: this.props.width + "rem" }
                    : { width: '100%' }}>
                <img src={searcIcon} className="search-icon" />
                <Loading show={this.state.loading} />
                <input placeholder={this.props.placeholder} autoComplete="off"
                    onChange={(e) => this.handleSearch(e.target.value)} />
                {this.state.result.length > 0 && <ul>
                    {this.createDropdown()}
                </ul>}
            </div>
        )
    }
}

export default SearchBoxNoRedux;