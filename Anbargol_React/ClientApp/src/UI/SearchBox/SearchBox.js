import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchBox.module.css';
import searcIcon from '../../Assets/images/search.png'
import Loading from '../Loading/Loading';

class SearchBox extends Component {

    render() {
        return (
            <div className="search-box light-sans"
                style={this.props.width
                    ? { width: this.props.width }
                    : { width: '100%' }}>
                <img src={searcIcon} className="search-icon" />
                <Loading show={true} />
                <input placeholder={this.props.placeholder} />
                <ul>
                    <li>گل شماره 1</li>
                    <li>گل شماره 1</li>
                    <li>گل شماره 1</li>
                    <li>گل شماره 1</li>
                    <li>گل شماره 1</li>
                    <li>گل شماره 1</li>
                    <li>گل شماره 1</li>
                    <li>گل شماره 1</li>
                    <li>گل شماره 1</li>
                    <li>گل شماره 1</li>
                    <li>گل شماره 1</li>
                    <li>گل شماره 1</li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        keyword: state.keyword
    }
}

const mapDispatchToProps = dispatch => {
    return {
        search: () => dispatch({ type: '', value: '' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);