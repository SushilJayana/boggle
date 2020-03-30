import { combineReducers } from "redux";
import red_matrix_data from "./red_matrix_data";
import red_valid_word_list from "./red_valid_word_list";
import red_api from "./red_api";

const reducer_manager = 
combineReducers({
  red_matrix_data: red_matrix_data,
  red_valid_word_list : red_valid_word_list,
  red_api : red_api
});

export default reducer_manager;