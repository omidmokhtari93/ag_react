import React, { Component } from 'react';
import './Input.module.css';
import * as inputTypes from '../../Shared/inputTypes';
import DatePickerWrapper from '../DatePicker/DatePickerWrapper';
import SearchBoxNoRedux from '../SearchBox/SearchBox_NonRedux';

class Input extends Component {
    ref = React.createRef();

    attr = {
        defaultValue: this.props.value,
        type: this.props.type,
        className: "form-control form-control-md",
        name: this.props.name,
    }

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
        switch (this.props.type) {
            //////////////////////////////////////////////////////////TEXT/////////////////////////////////////////////////////////
            case inputTypes.text:
                return <input {...this.attr} onChange={(e) => this.props.handleChange(e.target.name, e.target.value)} />
            ////////////////////////////////////////////////////////NUMBER/////////////////////////////////////////////////////////
            case inputTypes.number:
                return <input {...this.attr} type={inputTypes.number} style={{ textAlign: 'center' }}
                    onChange={(e) => this.props.handleChange(e.target.name, e.target.value)} />
            ///////////////////////////////////////////////////////SELECT/////////////////////////////////////////////////////////
            case inputTypes.select:
                return (<select {...this.attr} onChange={(e) => this.props.handleChange(e.target.name, e.target.value)}>
                    <option value="">انتخاب کنید</option>
                    {this.createOptions()}
                </select>)
            ////////////////////////////////////////////////////////TEXT AREA//////////////////////////////////////////////////////
            case inputTypes.textarea:
                return <textarea rows={this.props.rows ? this.props.rows : 1} {...this.attr}
                    onChange={(e) => this.props.handleChange(e.target.name, e.target.value)}></textarea>
            /////////////////////////////////////////////////////////FILE/////////////////////////////////////////////////////////
            case inputTypes.file:
                return (<input style={{ padding: '3px' }} className="form-control form-control-md"
                    type="file" defaultValue={this.attr.value} type={this.attr.type}
                    onChange={(e) => this.props.handleChange(e.target.name, e.target.value)} />)
            ////////////////////////////////////////////////////////////DATE////////////////////////////////////////////////////////////
            case inputTypes.date:
                return <DatePickerWrapper name={this.props.name} handleChange={(name, value) => this.props.handleChange(name, value)} />
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
                    <select ref={this.ref} className="form-control form-control-md rtl"
                        onChange={(e) => this.props.handleChange(e.target.name, e.target.value)}
                        value={this.props.value}
                        name={this.props.name}>
                        <option value="">انتخاب کنید</option>
                        {this.createOptions()}
                    </select>
                </div>)
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            default:
                return <input {...this.attr} onChange={(e) => this.props.handleChange(e.target.name, e.target.value)} />
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