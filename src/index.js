import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'Containers/AppContainer';
import { BrowserRouter as Router, Route } from "react-router-dom";


ReactDOM.render(
    <Router>
        <Route path={["/section/:id", "/"]} component={AppContainer} />
    </Router>,
    document.getElementById('root')
);
