import { Actions } from '../actions/myActions';

export default reducer = (state = { counter: 0 }, action) => {
    switch (action.type) {
        case Actions.DO_INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            };
        case Actions.DO_DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            };
        default:
            return state;
    }
}
