import React from 'react';
import './Input.module.css';
import * as inputTypes from './inputTypes';
import DatePicker from 'react-datepicker2';

const Input = props => {
    const attr = {
        defaultValue: props.value,
        type: props.type,
        className: "form-control form-control-md",
        name: props.name,
        required: props.required
    }

    let createInput = e => {
        switch (props.type) {
            case inputTypes.text:
                return <input {...attr} onChange={(e) => props.handleChange(e)} />
            case inputTypes.select:
                return <select {...attr} onChange={(e) => props.handleChange(e)}>
                    <option value="">انتخاب کنید</option>
                    {props.options &&
                        props.options.map((op, idx) =>
                            <option key={idx} value={op.value}>
                                {op.name}
                            </option>)}
                </select>
            case inputTypes.textarea:
                return <textarea rows={props.rows ? props.rows : 1} {...attr} onChange={(e) => props.handleChange(e)}></textarea>
            case inputTypes.file:
                return (<input style={{ padding: '3px' }} className="form-control form-control-md" type="file" defaultValue={attr.value} type={attr.type}
                    onChange={(e) => props.handleChange(e)} />)
            case inputTypes.date:
                return <DatePicker
                    // onChange={value => this.setState({ value })}
                    isGregorian={false}
                    timePicker={false}
                    inputJalaaliFormat="jYYYY/jMM/jDD"
                    value={props.value}
                />
            default:
                return <input {...attr} onChange={(e) => props.handleChange(e)} />
        }
    }

    return (
        <div className="react-input mb-3">
            <div className="labels-area">
                <div className="label">{props.label}</div>
                <div className="message">{props.touched && (props.value == '') && props.required && '* فیلد مورد نیاز *'}</div>
            </div>
            {createInput()}
        </div>
    )
}

export default Input;