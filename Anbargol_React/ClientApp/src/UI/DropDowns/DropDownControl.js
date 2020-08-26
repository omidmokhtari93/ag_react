import React, { Component } from 'react';
import Wrapper from '../../Shared/Wrapper/Wrapper';
import Input from '../Inputs/Input';
import './DropDown.module.css';

class DropDownControl extends Component {
    state = {
        options: [{ name: 'فرم 1', value: 9865 }],
        value: '',
        type: "select",
        required: true,
        touched: false,
        name: "selectform",
        label: "نام آیتم",
        handleChange: (name, value) => this.handleChange(name, value),
    }

    handleChange = (name, value) => {
        let updatedState = { ...this.state };
        updatedState.value = value;
        updatedState.touched = true;
        console.log(name, value)
        this.setState({ ...updatedState })
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-10">
                    <Input {...this.state} />
                </div>
                <div className="col-sm-1 text-center pr-0">
                    <div>&nbsp;</div>
                    <button className="btn btn-md btn-secondary w-100">{'<'}</button>
                </div>
                <div className="col-sm-1 text-center pr-0">
                    <div>&nbsp;</div>
                    <button className="btn btn-md btn-secondary w-100">{'>'}</button>
                </div>
            </div>
        )
    }
}

export default DropDownControl;