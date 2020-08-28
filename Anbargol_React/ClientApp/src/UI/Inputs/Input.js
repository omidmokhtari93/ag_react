import React, { Component } from 'react';
import './Input.module.css';
import * as inputTypes from '../../Shared/inputTypes';
import DatePickerWrapper from '../DatePicker/DatePickerWrapper';
import SearchBoxNoRedux from '../SearchBox/SearchBox_NonRedux';

class Input extends Component {
    ref = React.createRef();

    componentDidMount() {
        if (this.props.type == inputTypes.control_select) {
            this.setState({ element: document.getElementsByName(this.props.name)[0] })
        }
    }

    handleButtonClick = action => {
        let e = this.ref.current;
        if (action == 'inc') {
            if (e.selectedIndex < e.options.length - 1) {
                e.selectedIndex = e.selectedIndex + 1
            }
        } else {
            if (e.selectedIndex > 0) {
                e.selectedIndex = e.selectedIndex - 1
            }
        }
        this.props.handleChange(e.name, e.value)
    }
    createOptions = () => {
        let options = null;
        this.props.options &&
            (options = this.props.options.map((op, idx) => <option key={idx} value={op.value}>{op.name}</option>))
        return options;
    }

    createInput = e => {
        let attr = {
            value: this.props.value,
            type: this.props.type,
            className: "form-control form-control-md",
            name: this.props.name,
            onChange: (e) => this.props.handleChange(e.target.name, e.target.value)
        }
        switch (this.props.type) {
            //////////////////////////////////////////////////////////TEXT/////////////////////////////////////////////////////////
            case inputTypes.text:
                return <input {...attr} />
            ////////////////////////////////////////////////////////NUMBER/////////////////////////////////////////////////////////
            case inputTypes.number:
                return <input {...attr} style={{ textAlign: 'center' }} />
            ///////////////////////////////////////////////////////SELECT/////////////////////////////////////////////////////////
            case inputTypes.select:
                return (<select {...attr} >
                    <option value="">انتخاب کنید</option>
                    {this.createOptions()}
                </select>)
            ////////////////////////////////////////////////////////TEXT AREA//////////////////////////////////////////////////////
            case inputTypes.textarea:
                return <textarea rows={this.props.rows ? this.props.rows : 1} {...attr}></textarea>
            /////////////////////////////////////////////////////////FILE/////////////////////////////////////////////////////////
            case inputTypes.file:
                let copyAttr = { ...attr };
                delete copyAttr.value;
                return (<input style={{ padding: '3px' }}
                    {...copyAttr}
                    onChange={(e) => this.props.handleChange(e.target.name, e.target.files[0])} />)
            ////////////////////////////////////////////////////////////DATE////////////////////////////////////////////////////////////
            case inputTypes.date:
                return <DatePickerWrapper name={this.props.name}
                    handleChange={(name, value) => this.props.handleChange(name, value)} />
            ////////////////////////////////////////////////////////////SEARCH/////////////////////////////////////////////////////////
            case inputTypes.search:
                return <SearchBoxNoRedux
                    {...this.props}
                    handleResponse={(e) => this.props.handleChange(this.props.name, e.id)}
                />
            ////////////////////////////////////////////////////////////CONTROL_SELECT//////////////////////////////////////////////////
            case inputTypes.control_select:
                return (<div className="input-group mb-3 ltr">
                    <div className="input-group-prepend">
                        <button className="input-group-text"
                            onClick={() => this.handleButtonClick('dec')}>{'<'}</button>
                        <button className="input-group-text"
                            onClick={() => this.handleButtonClick('inc')}>{'>'}</button>
                    </div>
                    <select ref={this.ref} className="form-control form-control-md rtl" {...attr}>
                        {/* <option value="">انتخاب کنید</option> */}
                        {this.createOptions()}
                    </select>
                </div>)
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            default:
                return <input {...attr} />
        }
    }
    render() {
        return (
            <div className="react-input mb-3">
                <div className="labels-area">
                    <div className="label">{this.props.label}</div>
                    <div className="message">{this.props.touched && (this.props.value == '') && this.props.required && '* فیلد مورد نیاز *'}</div>
                </div>
                {this.createInput()}
            </div>
        )
    }


}

export default Input;