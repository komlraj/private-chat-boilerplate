import React, { Component } from 'react';
import './App.scss';
import Loadable from 'react-loadable';

const Loading = () => {
  return <div>loading...</div>
};

const Dashboard = Loadable({
  loader: () => 
  import(/* webpackChunkName: 'dashboard' */ './components/Dashboard'),
  loading: Loading
});

class App extends Component {

  render() {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}

export default App;