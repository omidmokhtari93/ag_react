import React, { Component, useState } from 'react';
import './DatePickerWrapper.module.css';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';

const DatePickerWrapper = props => {
    return (
        <DatePicker
            value={props.value}
            onChange={(date) => props.handleChange(props.name, date)}
            shouldHighlightWeekends
            locale="fa"
            inputClassName="form-control form-control-md"
        />
    )
}

export default DatePickerWrapper;