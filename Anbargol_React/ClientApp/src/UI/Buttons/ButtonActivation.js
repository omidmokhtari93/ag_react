import * as  buttonTypes from './ButtonTypes';

// this property active button after validate form
export const ButtonActivation = (buttons, formValidity) => {
    Object.keys(buttons).map(x => {
        formValidity ? (buttons[x].visible && !buttons[x].enable) && (buttons[x].enable = true)
            : (buttons[x].visible && buttons[x].enable && x != buttonTypes.cancel) && (buttons[x].enable = false)
    })
    return buttons;
}

//this property enable button by passing type to it
export const visibleButton = (buttons, type) => {
    buttons[type].visible = true;
    return buttons;
}