import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Register from './components/Register';
import HomePage from './components/HomePage';
import CollectionsPage from './components/CollectionsPage'; // To be created
import Layout from './components/Layout';
import './index.css';


function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={HomePage} />
          <Route path="/collections" component={CollectionsPage} /> {/* To be created */}
          <Route path="/" exact component={HomePage} /> {/* Redirect to home or landing page */}
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
