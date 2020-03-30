import React from 'react';
import './valid_word_list.css';

export default class ValidWordList extends React.Component {

    render() {

        let word_view_list = null;
        if (this.props.valid_word_list && (this.props.valid_word_list).length > 0) {

            word_view_list = this.props.valid_word_list.map((value, key) => {
                return <tr key={key}><td>{value.word}</td><td>{value.length}</td><td>{value.score}</td></tr>
            });
        }

        return (
            <div>
                <table className="vwl_table_hd">
                    <thead>
                        <tr>
                            <th>Word</th>
                            <th>Length</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                </table>
                <div id="vwl_section">
                    <table className="vwl_table">
                        <tbody>
                            {word_view_list}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
