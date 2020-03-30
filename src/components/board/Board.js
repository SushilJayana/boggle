import React from 'react';
import './board.css';
import { connect } from "react-redux";

class Board extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            board_data: null,
            matrix_data: []
        }
    }

    componentDidMount() {

        fetch(this.props.red_api.getMatrixData,
            {
                method: "POST",
                body: JSON.stringify({ "size": 4 }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(results => results.json())
            .then(data => {

                if (data.status === "SUCCESS") {
                    if (data.payload !== "") {

                        let arr_matrix = data.payload.matrix_value.split("");

                        let board_data = arr_matrix.map((value, key) => {
                            return (
                                <div key={key} className="grid-item">{value}</div>
                            );
                        });

                        this.setState({
                            board_data: board_data,
                            matrix_data: data.payload

                        });

                        this.props.setMatrixData(data.payload);
                    }
                }
            });
    }

    render() {
        return (

            <div className="grid-container">
                {this.state.board_data}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        red_matrix_data: state.red_matrix_data.matrix_data,
        red_api: state.red_api.api_list
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setMatrixData: (payload) => {
            dispatch({ type: "SET_MATRIX_DATA", payload: payload });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);