import React    from 'react';
import ReactDom from 'react-dom';

import 'bootstrap-css-only';
import './scss/style.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shifts: []
    };
    this.makeDummyShift = this.makeDummyShift.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.seconds = 999;
    this.timer = 0;
  }

  makeDummyShift() {

    const seconds = this.seconds --;
    const newHours = Math.floor(Math.random() * 12 + 1);
    let status = 'UNFILLED';

    const p = (Math.random() + .01).toFixed(2);
    console.log(newHours, p);

    if ((newHours > 6 && p <= .01) || (newHours <= 6 && p > .01 && p <= .03 )) {
      status = 'CANCELLED';
    } else if ((newHours > 6 && p <= .03) || (newHours <= 6 && p <= .01)) {
      status = 'CONFIRMED';
    } else {
      status = 'UNFILLED';
    }
    if (seconds === 0) {
      clearInterval(this.timer);
    }

    const shiftArray = this.state.shifts;

    shiftArray.push({shift: {
      hours: newHours,
      status: status
    }});

    this.setState({
      shifts: shiftArray
    }, () => console.log(this.state.shifts));

  }

  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.makeDummyShift, 1000
      );
    }
  }

  render(){

    return (
      <div className="container">
        <h1>Messly Shifts</h1>
        <div className="Row">
          <div className="col-md-3 col-xs-6">
            <p>unfilled shifts</p>
          </div>
          <div className="col-md-3 col-xs-6">
            <p> confirmed shifts</p>
          </div>
          <div className="col-md-3 col-xs-6">
            <p>cancelled shifts</p>
          </div>
          <div className="col-md-3 col-xs-6">
            <p>confirmed or unfilled shifts</p>
          </div>
        </div>
        <div className="Row">
          <div className="col-md-6">
            bar chart
          </div>
          <div className="col-md-6">
            pie chart
          </div>
        </div>
      
        <div>
          <button className="button" onClick={this.startTimer}>
          click
          </button>
        </div>
      </div>
    );
  }
}

ReactDom.render(
  <App />,
  document.getElementById('root')
);
