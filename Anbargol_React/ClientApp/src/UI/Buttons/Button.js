import React from 'react';
import './Button.module.css';

const Buttons = props => {
    let btns = Object.keys(props.options).map((btn, idx) => {
        switch (btn) {
            case "submit":
                return <button key={idx} className="btn btn-md btn-primary" onClick={props.onSubmit}>ثبت</button>
            case "edit":
                return <button key={idx} className="btn btn-md btn-success" onClick={props.onEdit}>ویرایش</button>
            case "cancel":
                return <button key={idx} className="btn btn-md btn-danger" onClick={props.onCancel}>انصراف</button>
            default:
                return <button key={idx} className="btn btn-md btn-danger" onClick={props.default}>انجام</button>
        }
    })
    return (
        <div className="control-buttons">
            {btns}
        </div>
    )
}

export default Buttons;