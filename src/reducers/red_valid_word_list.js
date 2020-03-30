let initialData = {
    valid_word_list : []
}

const red_valid_word_list = (state = initialData, action) => {
    switch (action.type) {
        case 'GET_VALID_WORD_LIST':
            return  state;
        case 'SET_VALID_WORD_LIST':
            let vlist_arr =  state.valid_word_list;
            vlist_arr.push(action.payload);
            return {
                ...state,
                valid_word_list: vlist_arr
                }
        default:
            return state;

    }

}
export default red_valid_word_list;
