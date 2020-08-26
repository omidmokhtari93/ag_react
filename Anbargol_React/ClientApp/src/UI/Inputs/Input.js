import React from 'react';
import './Input.module.css';
import * as inputTypes from '../../Shared/inputTypes';
import DatePickerWrapper from '../DatePicker/DatePickerWrapper';
import SearchBoxNoRedux from '../SearchBox/SearchBox_NonRedux';

const Input = props => {
    const attr = {
        defaultValue: props.value,
        type: props.type,
        className: "form-control form-control-md",
        name: props.name,
    }
    let createInput = e => {
        switch (props.type) {
            case inputTypes.text:
                return <input {...attr} onChange={(e) => props.handleChange(e.target.name, e.target.value)} />
            case inputTypes.number:
                return <input {...attr} type={inputTypes.number} style={{ textAlign: 'center' }}
                    onChange={(e) => props.handleChange(e.target.name, e.target.value)} />
            case inputTypes.select:
                return <select {...attr} onChange={(e) => props.handleChange(e.target.name, e.target.value)}>
                    <option value="">انتخاب کنید</option>
                    {props.options &&
                        props.options.map((op, idx) =>
                            <option key={idx} value={op.value}>
                                {op.name}
                            </option>)}
                </select>
            case inputTypes.textarea:
                return <textarea rows={props.rows ? props.rows : 1} {...attr}
                    onChange={(e) => props.handleChange(e.target.name, e.target.value)}></textarea>
            case inputTypes.file:
                return (<input style={{ padding: '3px' }} className="form-control form-control-md"
                    type="file" defaultValue={attr.value} type={attr.type}
                    onChange={(e) => props.handleChange(e.target.name, e.target.value)} />)
            case inputTypes.date:
                return <DatePickerWrapper name={props.name} handleChange={(name, value) => props.handleChange(name, value)} />
            case inputTypes.search:
                return <SearchBoxNoRedux
                    {...props}
                    handleResponse={(e) => props.handleChange(props.name, e.id)}
                />
            default:
                return <input {...attr} onChange={(e) => props.handleChange(e.target.name, e.target.value)} />
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