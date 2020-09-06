import React, { Component } from 'react';
import './Input.module.css';
import * as inputTypes from '../../Shared/inputTypes';
import SearchBoxNoRedux from '../SearchBox/SearchBox_NonRedux';
import DatePicker from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

class Input extends Component {
    ref = React.createRef();

    handleButtonClick = e => {
        let n = this.ref.current;
        "inc" == e ? n.selectedIndex < n.options.length - 1
            && (n.selectedIndex = n.selectedIndex + 1) : n.selectedIndex > 0
            && (n.selectedIndex = n.selectedIndex - 1);
        this.props.handleChange(n.name, n.value)
    };

    createOptions = () => {
        let options = null;
        this.props.options &&
            (options = this.props.options.map((op, idx) => <option key={idx} value={op.value}>{op.name}</option>))
        return options;
    }

    createInput = e => {
        ///////////////////////////////////////////this block for validation control select///////////////////////////////////
        let next = false;
        let previous = false;
        let ele = this.ref.current;
        if (this.props.type == inputTypes.control_select && ele) {
            console.log(ele.options.length)
            if (ele.selectedIndex == 0) {
                previous = true;
            }
            if (ele.selectedIndex == (ele.length - 1)) {
                next = true
            }
        }
        ///////////////////////////////////////////////////////set attribute for inputs////////////////////////////////////////
        let isValid = (this.props.touched && (this.props.value != '') && this.props.required) ? 'is-valid' : '';
        let isInvalid = (this.props.touched && (this.props.value == '') && this.props.required) ? 'is-invalid' : '';
        let attr = {
            value: this.props.value,
            type: this.props.type,
            className: "form-control form-control-md " + isValid + isInvalid,
            name: this.props.name,
            onChange: this.props.type == inputTypes.select
                ? (e) => this.props.handleChange(e.target.name, e.target.value, e.target.options[e.target.selectedIndex].text)
                : (e) => this.props.handleChange(e.target.name, e.target.value)
        }
        switch (this.props.type) {
            //////////////////////////////////////////////////////////TEXT/////////////////////////////////////////////////////////
            case inputTypes.text:
                return <input {...attr} />
            //////////////////////////////////////////////////////////ENGLISH TEXT/////////////////////////////////////////////////
            case inputTypes.englishText:
                return <input {...attr} style={{ fontFamily: 'tahoma', direction: 'ltr', textAlign: "left" }} />
            ////////////////////////////////////////////////////////NUMBER/////////////////////////////////////////////////////////
            case inputTypes.number:
                return <input {...attr} style={{ textAlign: 'center' }} />
            ///////////////////////////////////////////////////////SELECT//////////////////////////////////////////////////////////
            case inputTypes.select:
                return (<select {...attr} >
                    {(this.props.notSelected == undefined
                        || this.props.notSelected == true)
                        && <option value="">انتخاب کنید</option>}
                    {this.createOptions()}
                </select>)
            ////////////////////////////////////////////////////////TEXT AREA//////////////////////////////////////////////////////
            case inputTypes.textarea:
                return <textarea rows={this.props.rows ? this.props.rows : 1} {...attr}></textarea>
            /////////////////////////////////////////////////////////FILE/////////////////////////////////////////////////////////
            case inputTypes.file:
                let copyAttr = { ...attr };
                delete copyAttr.value;
                delete copyAttr.onChange;
                return (<input style={{ padding: '3px' }}
                    {...copyAttr}
                    onChange={(e) => this.props.handleChange(e.target.name, e.target.files[0])} />)
            ////////////////////////////////////////////////////////////DATE////////////////////////////////////////////////////////////
            case inputTypes.date:
                return <DatePicker
                    value={this.props.value}
                    onChange={(date) => this.props.handleChange(this.props.name, date)}
                    shouldHighlightWeekends
                    locale="fa"
                    slideAnimationDuration="0.1s"
                    calendarPopperPosition="bottom"
                    inputClassName={"form-control form-control-md bg-white " + isValid + isInvalid}
                />
            ////////////////////////////////////////////////////////////SEARCH/////////////////////////////////////////////////////////
            case inputTypes.search:
                return <SearchBoxNoRedux
                    {...this.props}
                    handleResponse={(e) => this.props.handleChange(this.props.name, e.id)}
                />
            ////////////////////////////////////////////////////////////CONTROL_SELECT//////////////////////////////////////////////////
            case inputTypes.control_select:
                let att = { ...attr }
                !this.props.notSelected && (delete att.className);
                return (<div className="input-group mb-3 ltr">
                    <div className="input-group-prepend">
                        <button className={"input-group-text " + (previous && 'no-drop')}
                            disabled={previous}
                            onClick={() => this.handleButtonClick('dec')}>{'<'}</button>
                        <button className={"input-group-text " + (next && 'no-drop')}
                            disabled={next}
                            onClick={() => this.handleButtonClick('inc')}>{'>'}</button>
                    </div>
                    <select ref={this.ref} className="form-control form-control-md rtl" {...att}>
                        {(this.props.notSelected == undefined
                            || this.props.notSelected == true)
                            && <option value="">انتخاب کنید</option>}
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
                    {this.props.label}
                </div>
                {this.createInput()}
            </div>
        )
    }


}

export default Input;