import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('./components/Home/home'));
const Selected = lazy(() => import('./components/Selected/selected'));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/selected' component={Selected} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
