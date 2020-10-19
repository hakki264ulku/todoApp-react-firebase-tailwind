import React from 'react';
import './App.css';
import 'twin.macro'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'

import firebase from './firebase'

import EntryDashboard from './components/entryDashboard'
import Register from './components/register';
import Login from './components/login';
import UserToDoPage from './components/UserToDoPage';

const db = firebase.firestore()

function App() {

  return (
    <BrowserRouter>
      <Route exact path='/entryDashboard' component={EntryDashboard}/>
      <Route exact path='/' component={EntryDashboard}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/UserToDoPage' component={UserToDoPage} />
    </BrowserRouter>
  );
}



export default App;
