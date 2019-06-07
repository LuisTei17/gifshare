import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import uploadScreen from './components/uploadScreen/UploadScreen';
import FileDownload from './components/FileDownload/FileDownload';
function App() {

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={uploadScreen} />
        <Route exact path="/download/:filename" component={FileDownload} />
      </Router>
    </div>
  );
}

export default App;
