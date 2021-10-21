import React from 'react'
import {Switch, Route} from 'react-router-dom'
import routes from './containers/routes';

function App() {
  return (
    <Switch>
      {routes.map(({component: Component, path, ...rest}) => {
        return (
          <Route
            exact path={path}
            render = {(props) => (
              <React.Suspense fallback={"loading..."}>
                <Component {...props} />
              </React.Suspense>
            )}
            key={path}
            {...rest}
          />
        );
      })}
    </Switch>
  );
}

export default App;
