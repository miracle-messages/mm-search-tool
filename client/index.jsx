import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';

import history from './history';
import store from './store';
import AppContainer from './components/AppContainer';
import App from './components/App';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <AppContainer App={App} />
        </Router>
    </Provider>,
    document.getElementById('app'),
);
