import React, { Component } from 'react';
import { Container, Col, Row } from "react-bootstrap";
import { connect } from 'react-redux';

class ScoreBoard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recent_stats: '',
      puzzle_stats: '',
      isDataLoaded: false
    }
  }

  componentDidMount() {

    setTimeout(() => {
      fetch(this.props.red_api.getPuzzleStats, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "word_matrix_id": this.props.red_matrix_data.word_matrix_id })
      }).then(results => results.json())
        .then(data => {
          if (data.status === "SUCCESS" && data.payload) {
            this.setState({ puzzle_stats: data.payload, isDataLoaded: true })
          }
        })

      if (this.props.red_valid_word_list && this.props.red_valid_word_list.length > 0) {
        let total_words = 0, total_score = 0, max_length = 0;
        let longest_word = '';

        this.props.red_valid_word_list.forEach((value, key) => {
          total_words++;
          if (max_length < value.length) {
            longest_word = value.word;
            max_length = value.length;
          }
          total_score = total_score + value.point;

        });

        this.setState({
          recent_stats: {
            'total_score': total_score,
            'total_words': total_words,
            'longest_word': longest_word,
          }
        })
      }
    }, 2000)
  }

  render() {

    let ui_score =
      (<Container>
        <Row>
          <Col md={4}>
            <i><u>YOUR STATS : </u></i>
            <ul>
              <li><b>Total score : </b>{this.state.recent_stats.total_score}</li>
              <li><b>Total words : </b>{this.state.recent_stats.total_words}</li>
              <li><b>Longest word : </b>{this.state.recent_stats.longest_word}</li>
            </ul>
          </Col>
          <Col md={8}>
            <i><u>PUZZLE STATS : </u></i>
            <ul>
              <li><b>Played times</b> <i>(with atleast one valid word) : </i>{this.state.puzzle_stats.played_times}</li>
              <li><b>Most words : </b>{this.state.puzzle_stats.most_words}</li>
              <li><b>High score : </b>{this.state.puzzle_stats.high_score}</li>
              <li><b>Longest word : </b>{this.state.puzzle_stats.longest_word}</li>
            </ul>
          </Col>
        </Row>
      </Container>)

    let ui_score_init = (<p><i>Please wait, loading the scoreboard...</i></p>)

    return (
      <div>
        {(this.state.isDataLoaded)? ui_score : ui_score_init}
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

export default connect(mapStateToProps)(ScoreBoard);