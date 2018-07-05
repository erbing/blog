export default (state, action) => {
    switch (action.type) {
        case 'CHANGE_NAME': 
        return {
            card: action.card,
            dialog: action.dialog
        }

        case 'SHOW_DIALOG':
        return {
            card: state.card,
            dialog: {
                status:  true
            }
        }

        default:
        return state
    }
}