import React from 'react';
import Wrapper from '../../Shared/Wrapper/Wrapper';
import Input from '../../UI/Inputs/Input';

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
            const input = [1, 2, 3].map(x => {
                let item = <div key={counter} className="col-md-4">{elements[counter]}</div>
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

export default FormBuilder;