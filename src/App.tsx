import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  BrowserRouter as RouterProvider,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import store, { persistor } from 'store/store';
import { ConfigurationPage, QuestionsPage, ResultPage } from 'pages';
import { RouteNames } from './utils/helpers';

const App = () => (
  <Switch>
    <Route
      exact
      path={RouteNames.configuration}
      component={ConfigurationPage}
    />
    <Route exact path={RouteNames.questions} component={QuestionsPage} />
    <Route exact path={RouteNames.result} component={ResultPage} />
    <Redirect to={RouteNames.configuration} />
  </Switch>
);

const AppBootstrap = () => (
  <Provider store={store}>
    <RouterProvider>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </RouterProvider>
  </Provider>
);

export default AppBootstrap;
