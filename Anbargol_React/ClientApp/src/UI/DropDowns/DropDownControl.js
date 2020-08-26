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
            <Wrapper>
                <div className="drop-down-control">
                    <div style={{ marginLeft: '30%' }}>
                        <Input {...this.state} />
                    </div>
                    <button>{'>'}</button>
                    <button>{'<'}</button>
                </div>
            </Wrapper>
        )
    }
}

export default DropDownControl;