import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import routes from './containers/routes';
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import history from './history';

function App() {
  return (
    <Router history={history}>
      <Switch>
        {routes.map(({ component: Component, path, ...rest }) => {
          return (
            <Route
              exact path={path}
              render={(props) => (
                <React.Suspense fallback={"loading..."}>
                  <Header />
                  <Component {...props} />
                  <Footer />
                </React.Suspense>
              )}
              key={path}
              {...rest}
            />
          );
        })}
      </Switch>
    </Router>
  );
}

export default App;
