import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import uploadScreen from './components/uploadScreen/UploadScreen';

function App() {

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={uploadScreen} />
      </Router>
    </div>
  );
}

export default App;
