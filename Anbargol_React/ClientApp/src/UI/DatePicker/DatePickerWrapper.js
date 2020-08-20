import React, { Component } from 'react';
import './DatePickerWrapper.module.css';
import Datepicker from 'rezvani-datepicker';
import 'rezvani-datepicker/public/datepicker.min.css';


const DatePickerWrapper = props => {
    return (
        <Datepicker
            ref={this.datePickerRef}
            handleChange={(e) => props.handleChange(props.name, e.startDate.string)}
            name={props.name}
            rangePicker={false}
            type="datepicker" />
    )
}

export default DatePickerWrapper;