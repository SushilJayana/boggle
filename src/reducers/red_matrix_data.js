let initialData = {
    matrix_data : []
}

const red_matrix_data = (state = initialData, action) => {
    switch (action.type) {
        case 'GET_MATRIX_DATA':
            return  state;
        case 'SET_MATRIX_DATA':
            return {
                ...state,
                matrix_data: action.payload
                }
        default:
            return state;

    }

}
export default red_matrix_data;