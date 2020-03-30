import React, { Component } from 'react';

export default class Timer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            seconds: this.props.seconds,
            minutes: this.props.minutes
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {

            if (this.state.seconds > 0) {

                if (this.state.minutes === 0 && this.state.seconds < 11) {
                    document.getElementById("s_timer").style.color = "red";
                }

                this.setState((prevState) => {
                    return { seconds: prevState.seconds - 1 }
                })
            }
            if (this.state.seconds === 0) {
                if (this.state.minutes > 0) {
                    this.setState({ seconds: 59 })
                    this.setState((prevState) => {
                        return { minutes: prevState.minutes - 1 }
                    })
                } else {
                    clearInterval(this.interval)
                }
            }

        }, 1000)


    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <span id='s_timer' > <b>CountDown </b> <legend>{'0' + this.state.minutes} : {(this.state.seconds) < 10 ? '0' + this.state.seconds : this.state.seconds}</legend></span >
        );
    }
}
