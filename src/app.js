import React    from 'react';
import ReactDom from 'react-dom';
import { VictoryPie, VictoryBar, VictoryChart, VictoryLegend } from 'victory';

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
    this.hours1to4 = 0;
    this.hours5to8 = 0;
    this.hours9to12 = 0;
  }

  makeDummyShift() {
    const seconds = this.seconds --;
    const newHours = Math.floor(Math.random() * 12 + 1);
    let status = 'UNFILLED';

    const p = (Math.random() + .01).toFixed(2);
    console.log(`${status} ${newHours} hour shift, random number ${p}`);

    if (newHours > 8 ){
      this.hours9to12 ++;
    } else if (newHours > 4 && newHours <=8 ) {
      this.hours5to8 ++;
    } else {
      this.hours1to4 ++;
    }

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


    return (
      <div className="container">

        <div className="Row">

          <h1>Messly Shifts</h1>

          <button className="startButton" onClick={this.startTimer}>
            CLICK HERE TO START APP
          </button>


        </div>

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
            <h3>Bar Chart by Hours</h3>
            <VictoryChart

              domainPadding={50}>

              <VictoryBar
                labels={(d) => `${d.y}`}
                categories={{ x: ['1-4 Hours', '5-8 Hours', '9-12 Hours'] }}
                style={{
                  data: {
                    fill: 'black',
                    width: 30
                  }

                }}
                data= {[
                  { x: 1, y: this.hours1to4, width: 16 },
                  { x: 2, y: this.hours5to8, width: 16 },
                  { x: 3, y: this.hours9to12, width: 16 }
                ]}
              />
            </VictoryChart>

          </div>
          <div className="col-md-6">
            <h3>Pie Chart by Shift Status</h3>

            <svg width={315} height={100} >
               <VictoryLegend standalone={false}
                 orientation="horizontal"
                 x={20} y={20}

                 title="Legend"
                 centerTitle
                 style={{ border: { stroke: "black" } }}
                 colorScale={['black', 'grey', '#D5E0EA']}
                 data={[
                   { name: 'Unfilled' }, { name: 'Confirmed' }, { name: 'Cancelled' }
                 ]}
               />

             </svg>


            <VictoryPie
              colorScale={['black', 'grey', '#D5E0EA']}
              data={[
                { x: null, y: this.unfilled, label: null  },
                { x: null, y: this.confirmed, label: null },
                { x: null, y: this.cancelled, label: null  }
             ]}
            />

          </div>
        </div>

        {/* <ul>
          { this.state.shifts.map((shift, i) =>
            <li key={i}>{ shift.shift.hours }</li>
          )}
        </ul> */}
      </div>
    );
  }
}

ReactDom.render(
  <App />,
  document.getElementById('root')
);
