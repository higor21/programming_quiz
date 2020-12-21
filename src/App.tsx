import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as RouterProvider, Redirect, Route, Switch } from 'react-router-dom';

import store, { persistor } from 'store/store';
import { ConfigurationPage, QuestionsPage, ResultPage } from 'pages';

const App = () => {
  return (
    <Switch>
      <Route exact={true} path="/configuration" component={ConfigurationPage} />
      <Route exact={true} path="/questions" component={QuestionsPage} />
      <Route exact={true} path="/result" component={ResultPage} />
      <Redirect to="/configuration" />
    </Switch>
  );
};

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
