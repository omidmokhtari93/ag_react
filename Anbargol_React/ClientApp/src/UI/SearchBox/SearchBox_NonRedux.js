import React, { Component } from 'react';
import './SearchBox.module.css';
import searcIcon from '../../Assets/images/search.png'
import Loading from '../Loading/Loading';
import http from 'axios';
import propTypes from 'prop-types';

class SearchBoxNoRedux extends Component {
    state = {
        value: '',
        timeOut: null,
        loading: false,
        result: [],
        loadingStyle: {
            width: "20px",
            position: "absolute",
            left: "4px",
            top: "9px",
        },
        showSelected: false,
        selectedText: ''
    }
    searchBoxRef = React.createRef();

    componentDidMount() {
        document.addEventListener('click', (e) => {
            (!this.searchBoxRef.current.contains(e.target)) &&
                this.setState({ result: [], loading: false, value: '' })

        })
    }

    componentWillUnmount() {
        document.removeEventListener('click');
    }

    handleSearch = value => {
        clearTimeout(this.state.timeOut)
        this.setState({ result: [], loading: true, value: value })
        this.state.timeOut = setTimeout(() => {
            if (value.trim()) {
                this.handleApiReq(value).then(x => {
                    this.setState({ result: this.state.result.concat(x.data), loading: false })
                })
            } else {
                this.setState({ loading: false })
            }
        }, this.props.timeout);
    }

    removeSelected = () => {
        this.setState({ showSelected: false });
        this.props.removeSelected(this.props.name)
    }

    handleApiReq = value => {
        const obj = {};
        this.props.reqParam.map(x => obj[x] = value)
        return http.get(this.props.url, {
            params: obj
        })
    }

    showReport = (name, id) => {
        this.props.removeOnChoose
            && this.setState({ showSelected: true, selectedText: name, result: [] })
        this.props.handleResponse({ name: name, id: id })
        this.setState({ result: [] })
    }

    createDropdown = () => {
        const items = this.state.result.map(obj => {
            return { name: this.props.resParam.map(key => obj[key]).join(' / '), id: obj[this.props.id] }
        })
        return items.map((item, index) => {
            return <li key={index} onClick={() => this.showReport(item.name, item.id)}>{item.name}</li>
        })
    }

    render() {
        return (
            <div className="search-box light-sans" ref={this.searchBoxRef} name={this.props.name}
                style={this.props.width
                    ? { width: this.props.width + "rem" }
                    : { width: '100%' }}>
                {this.state.showSelected && <div className="searchbox-selected">
                    <span>{this.state.selectedText}</span>
                    <span onClick={this.removeSelected}>✖</span>
                </div>}
                <img src={searcIcon} className="search-icon" />
                <Loading show={this.state.loading} style={this.state.loadingStyle} />
                <input placeholder={this.props.placeholder} autoComplete="off"
                    value={this.state.value}
                    onChange={(e) => this.handleSearch(e.target.value)} />
                {this.state.result.length > 0 && <ul>
                    {this.createDropdown()}
                </ul>}
            </div>
        )
    }
}
SearchBoxNoRedux.propTypes = {
    reqParam: propTypes.array,
    url: propTypes.string,
    resParam: propTypes.array,
    placeholder: propTypes.string,
    width: propTypes.string,
    handleResponse: propTypes.func,
    removeOnChoose: propTypes.bool,
    timeout: propTypes.string,
    name: propTypes.string,
    id: propTypes.string
}
export default SearchBoxNoRedux;