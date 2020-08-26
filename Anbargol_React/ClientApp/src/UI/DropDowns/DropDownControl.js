import React, { Component } from 'react';
import Wrapper from '../../Shared/Wrapper/Wrapper';
import Input from '../Inputs/Input';

class DropDownControl extends Component {
    state = {
        options: [{ name: 'فرم 1', value: 9865 }],
    }

    handleChange = (name, value) => {
        console.log(name, value)
    }
    
    render() {
        return (
            <Wrapper>
                <Input type="select"
                    options={this.state.options}
                    required
                    touched
                    name="selectform"
                    handleChange={this.handleChange} />
            </Wrapper>
        )
    }
}

export default DropDownControl;