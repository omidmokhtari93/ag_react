import React, { Component } from 'react';
import Wrapper from '../../Shared/Wrapper/Wrapper';
import Input from '../Inputs/Input';
import './DropDown.module.css';

class DropDownControl extends Component {
    state = {
        element: null,
        enbaleButton: false
    }

    componentDidMount() {
        this.setState({ element: document.getElementsByName(this.props.name)[0] })
    }

    handleButtonClick = action => {
        let e = this.state.element;
        console.log(e.selectedIndex)
        if (action == 'inc') {
            if ((e.selectedIndex < e.options.length - 1)) {
                e.selectedIndex = e.selectedIndex + 1
            }
            (e.selectedIndex == e.options.length - 1) && this.setState({ enbaleButton: true })
        } else {
            if (e.selectedIndex > 0) {
                e.selectedIndex = e.selectedIndex - 1
            }
            (e.selectedIndex == 0) && this.setState({ enbaleButton: false })
        }
    }

    render() {
        return (
            <div className="dropdown-control">
                <div className="right-side">
                    <select className="form-control form-control"
                        onChange={(e) => this.props.handleSelectChange(e.target.name, e.target.value)}
                        value={this.props.value}
                        name={this.props.name}>
                        <option value="">انتخاب کنید</option>
                        {this.props.options &&
                            this.props.options.map((op, idx) =>
                                <option key={idx} value={op.value}>
                                    {op.name}
                                </option>)}
                    </select>
                </div>
                <div className="left-side">
                    <button
                        disabled={this.state.enbaleButton}
                        onClick={() => this.handleButtonClick('inc')}
                        className="btn btn-md btn-secondary">{'<'}</button>
                    <button disabled={!this.state.enbaleButton}
                        onClick={() => this.handleButtonClick('dec')}
                        className="btn btn-md btn-secondary">{'>'}</button>
                </div>
            </div>
        )
    }
}

export default DropDownControl;