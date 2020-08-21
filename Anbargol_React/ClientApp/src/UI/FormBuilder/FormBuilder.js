import React from 'react';
import Wrapper from '../../Shared/Wrapper/Wrapper';
import Input from '../../UI/Inputs/Input';
import propTypes from 'prop-types';
import { ColumnCreator } from './ColumnCreator';

const FormBuilder = props => {
    let create = e => {
        const elementsLength = Object.keys(props.inputs).length;
        const elements = Object.keys(props.inputs).map((key, idx) => {
            return <Input {...props.inputs[key]}
                name={key}
                key={idx}
                handleChange={props.handleChange} />
        })
        const rows = Math.ceil(elementsLength / 3);
        const form = [];
        let counter = 0;
        for (let i = 0; i < rows; i++) {
            const input = [...Array(parseInt(props.column))].map(x => {
                let item = <div key={counter}
                    className={ColumnCreator(props.column)}>
                    {elements[counter]}
                </div>
                counter++;
                return item
            })
            form.push(<div className="row" key={counter}>
                {input}
            </div>)
        }
        return form;
    }

    return (
        <Wrapper>
            {create()}
        </Wrapper>
    )
}

FormBuilder.propTypes = {
    inputs: propTypes.object, //array of objects
    handleChange: propTypes.func,
    column: propTypes.oneOf(["1", "2", "3", "4", "6", "12"])
}

export default FormBuilder;