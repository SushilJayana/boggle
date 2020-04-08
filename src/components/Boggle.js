import React from 'react';
import Board from './board/Board';
import { Container, Col, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import ValidWordList from './valid_word_list/ValidWordList';
import Timer from './timer/Timer';
import ScoreBoard from './score_board/ScoreBoard';
import './boggle.css';

class Boggle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            valid_word_list: [],
            unique_valid_word_list: [],
            seconds: 59,
            minutes: 1,
            isTimeOver: false
        }
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.onGameCompletion = this.onGameCompletion.bind(this);
    }

    componentDidMount() {
        document.title = "Boggle Game"
        setTimeout(() => {
            this.onGameCompletion();
        }, ((this.state.minutes * 60) + (this.state.seconds)) * 1000)
    }

    onGameCompletion() {
        document.getElementById("in_word").style.display = "none";
        document.getElementById("message").style.display = "none";
        this.setState({ isTimeOver: true })
    }

    handleKeyUp(event) {

        if (event.keyCode === 13) {

            if (this.state.isTimeOver)
                return false

            let word = ((event.target.value).replace(/\s+/g, '') !== "") ? (event.target.value).toUpperCase() : "";

            if (this.state.unique_valid_word_list.indexOf(word) > -1) {
                document.getElementById("message").innerHTML = 'Already added';
                document.getElementById("in_word").value = "";
                document.getElementById("in_word").focus();
                return false;
            }

            document.getElementById("in_word").disabled = true;

            fetch(this.props.red_api.findValidWordsFromMatrixData, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "matrix_value": this.props.red_matrix_data.matrix_value,
                    "matrix_id": this.props.red_matrix_data.word_matrix_id,
                    "puzzle_instance": this.props.red_matrix_data.puzzle_instance,
                    "size": this.props.red_matrix_data.size,
                    "word": word
                })
            })
                .then(results => results.json())
                .then(data => {
                    if (data.status === "SUCCESS" && data.validity === 'valid' && data.payload) {
                        this.props.setValidWordList(data.payload);
                        this.setState({ valid_word_list: this.props.red_valid_word_list });
                        this.state.unique_valid_word_list.push(word);
                    } else {
                        document.getElementById("message").innerHTML = data.message;
                    }
                    document.getElementById("in_word").disabled = false;
                    document.getElementById("in_word").value = "";
                    document.getElementById("in_word").focus();
                });
        }
    }

    handleKeyPress() {
        document.getElementById("message").innerHTML = "";
    }

    render() {
        return (
            <div id="wrapper">
                <Container>
                    <h1>BOGGLE GAME</h1>
                    <Row>
                        <Col md={6} className="board-section">
                            <Board />
                        </Col>

                        <Col md={6} className="interact-section">
                            <Row>
                                <Col md={8} sm={7}>
                                    <h3>ADD A WORD </h3>
                                    <div id="d_inp">
                                        <input id="in_word" type="text" className="input" placeholder="Enter valid word" maxLength="16"
                                            onKeyUp={(event) => this.handleKeyUp(event)}
                                            onKeyPress={this.handleKeyPress}
                                            disabled={this.state.isTimeOver ? 'disabled' : ''} />
                                        &nbsp;&nbsp;<span id="message"></span>
                                        {this.state.isTimeOver ? <Button variant="success" onClick={() => { window.location.reload() }}>Play Again</Button> : ''}
                                    </div><br />

                                </Col>
                                <Col md={4} sm={5}>
                                    <Timer seconds={this.state.seconds} minutes={this.state.minutes} />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <ValidWordList valid_word_list={this.state.valid_word_list} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="score-section">
                        <Col md={12}>
                            {(this.state.isTimeOver) ? <ScoreBoard /> : <p><i>Wish you score more..</i></p>}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        red_matrix_data: state.red_matrix_data.matrix_data,
        red_valid_word_list: state.red_valid_word_list.valid_word_list,
        red_api: state.red_api.api_list
    };
};


const mapDispatchToProps = dispatch => {
    return {
        setValidWordList: (payload) => {
            dispatch({ type: 'SET_VALID_WORD_LIST', payload: payload })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Boggle);