import React from 'react';
import './Input.module.css';
import * as type from './inputTypes';

const Input = props => {
    let touched = true;
    const handleChange = e => {
        touched = true;
        props.handleChange(e)
    }
    const attr = {
        defaultValue: props.value,
        type: props.type,
        className: "form-control form-control-md",
        name: props.name,
        required: props.required
    }

    let inputType = e => {
        switch (props.type) {
            case type.text:
                return <input {...attr} onChange={(e) => handleChange(e)} />
            case type.select:
                return <select {...attr} onChange={(e) => handleChange(e)}>
                    {props.options &&
                        props.options.map((op, idx) =>
                            <option key={idx} value={op.value}>
                                {op.name}
                            </option>)}
                </select>
            case type.textarea:
                return <textarea rows={props.rows ? props.rows : 1} {...attr} onChange={(e) => handleChange(e)}></textarea>
            case type.file:
                return (<input style={{ padding: '3px' }} className="form-control form-control-md" type="file" defaultValue={attr.value} type={attr.type}
                    onChange={(e) => handleChange(e)} />)
            default:
                return <input {...attr} onChange={(e) => handleChange(e)} />
        }
    }

    console.log(touched, (props.value == ''), props.required)

    return (
        <div className="react-input mb-3">
            <div className="labels-area">
                <div className="label">{props.label}</div>
                <div className="message">{touched && (props.value == '') && props.required && '**'}</div>
            </div>
            {inputType()}
        </div>
    )
}

export default Input;