export const ButtonValidation = (buttons, formValidity) => {
    let btn = { ...buttons };
    Object.keys(buttons).map(x => {
        formValidity ? (!btn[x].enable && btn[x].visible) && (btn[x].enable = true)
            : (btn[x].enable && btn[x].visible) && (btn[x].enable = false)
    })
    return btn;
}