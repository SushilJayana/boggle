let initialData = {
    // api_list: {
    //     getMatrixData: 'http://localhost:3002/api/v1/word_matrices/getMatrixData',
    //     findValidWordsFromMatrixData: 'http://localhost:3002/api/v1/boggle/findValidWordsFromMatrixData',
    //     getPuzzleStats: 'http://localhost:3002/api/v1/matrix_valid_words/getPuzzleStats'
    // }
    api_list: {
        getMatrixData: 'https://api-boggle.herokuapp.com/api/v1/word_matrices/getMatrixData',
        findValidWordsFromMatrixData: 'https://api-boggle.herokuapp.com/api/v1/boggle/findValidWordsFromMatrixData',
        getPuzzleStats: 'https://api-boggle.herokuapp.com/api/v1/matrix_valid_words/getPuzzleStats'
    }
}

const red_api = (state = initialData, action) => {
    switch (action.type) {
        case 'GET_API_INFO':
            return state;
        default:
            return state;
    }

}
export default red_api;