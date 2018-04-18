// const React = require('react');
// React is a class, and first letter is capitalize.
// the from in green comes from what they are called in package.json

import React    from 'react';
import ReactDom from 'react-dom';

//this is call classical companent
class App extends React.Component {
  render(){
    // return React.createElement('div', {},
    //   React.createElement('hi', {}, 'I Like React'),
    //   React.createElement('h2', {}, 'I really do')
    // );
    return (
      <div>
        <h1>I love JSX!</h1>
        <h2>I also love React more... because of JSX</h2>
      </div>
    );
  }
}

ReactDom.render(
  <App />,
  document.getElementById('root')
);
