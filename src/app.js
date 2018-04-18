import React    from 'react';
import ReactDom from 'react-dom';
import { VictoryPie } from 'victory';

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
    this.confirmed = 0;
    this.cancelled = 0;
    this.unfilled = 0;
  }

  makeDummyShift() {
    const seconds = this.seconds --;
    const newHours = Math.floor(Math.random() * 12 + 1);
    let status = 'UNFILLED';

    const p = (Math.random() + .01).toFixed(2);
    console.log(newHours, p);

    if ((newHours > 6 && p <= .01) || (newHours <= 6 && p > .01 && p <= .03 )) {
      status = 'CANCELLED';
      this.cancelled ++;
    } else if ((newHours > 6 && p <= .03) || (newHours <= 6 && p <= .01)) {
      status = 'CONFIRMED';
      this.confirmed ++;
    } else {
      status = 'UNFILLED',
      this.unfilled ++;
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

    console.log(this.state);

    return (
      <div className="container">
        <h1>Messly Shifts</h1>
        <div className="Row">
          <div className="col-md-3 col-xs-6">
            <p>unfilled shifts = { this.unfilled }</p>
          </div>
          <div className="col-md-3 col-xs-6">
            <p> confirmed shifts = { this.confirmed }</p>
          </div>
          <div className="col-md-3 col-xs-6">
            <p>cancelled shifts = { this.cancelled }</p>
          </div>
          <div className="col-md-3 col-xs-6">
            <p>confirmed or unfilled shifts = { this.confirmed + this.unfilled }</p>
          </div>
        </div>
        <div className="Row">
          <div className="col-md-6">
            bar chart
          </div>
          <div className="col-md-6">
            <VictoryPie
              data={[
                { x: 1, y: this.unfilled, label: 'Unfilled' },
                { x: 2, y: this.confirmed, label: 'confirmed' },
                { x: 3, y: this.cancelled, label: 'cancelled' }
              ]}
            />
          </div>
        </div>
        {this.state.hours }
        <div>
          <button className="button" onClick={this.startTimer}>
          click
          </button>
        </div>
        {this.seconds}

        <ul>
          { this.state.shifts.map((shift, i) =>
            <li key={i}>{ shift.shift.hours }</li>
          )}
        </ul>
      </div>
    );
  }
}

ReactDom.render(
  <App />,
  document.getElementById('root')
);
