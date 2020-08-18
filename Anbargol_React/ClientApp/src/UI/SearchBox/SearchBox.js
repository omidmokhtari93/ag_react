import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchBox.module.css';
import searcIcon from '../../Assets/images/search.png'
import Loading from '../Loading/Loading';
import * as actions from '../../Store/Actions/SearchBoxActions';

class SearchBox extends Component {
    state = {
        timeOut: null,
    }
    searchBoxRef = React.createRef();

    componentDidMount() {
        document.addEventListener('click', (e) => {
            !this.searchBoxRef.current.contains(e.target) && this.props.clear()
        })
    }

    componentWillUnmount() {
        document.removeEventListener('click');
    }

    handleSearch = value => {
        clearTimeout(this.state.timeOut)
        this.props.showLoading()
        this.state.timeOut = setTimeout(() => {
            if (value.trim()) {
                this.props.search(value, this.props.url)
            } else {
                this.props.clear();
                this.props.hideLoading();
            }
        }, 1000);
    }

    showReport = id => {
        // console.log(id)
    }

    render() {
        return (
            <div className="search-box light-sans" ref={this.searchBoxRef}
                style={this.props.width
                    ? { width: this.props.width + "rem" }
                    : { width: '100%' }}>
                <img src={searcIcon} className="search-icon" />
                <Loading show={this.props.loading} />
                <input placeholder={this.props.placeholder} autoComplete="off"
                    onChange={(e) => this.handleSearch(e.target.value)} />
                {this.props.resultItems.length > 0 && <ul>
                    {this.props.resultItems.map((x, index) => <li onClick={() => this.showReport(x.Id)} key={index}>
                        {x.GolName + ' / ' + x.Format + ' / ' + x.Color + ' / ' + x.ColorType + ' / ' + x.Code}
                    </li>)}
                </ul>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        resultItems: state.result,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        search: (keyword, url) => dispatch(actions.apiSearchGol(keyword, url)),
        clear: () => dispatch(actions.clearResult()),
        showLoading: () => dispatch(actions.showLoading()),
        hideLoading: () => dispatch(actions.hideLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);