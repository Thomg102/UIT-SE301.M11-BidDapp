import React from 'react'
import {Switch, Route} from 'react-router-dom'
import routes from './containers/routes';
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";

function App() {
  return (
    <Switch>
      {routes.map(({component: Component, path, ...rest}) => {
        return (
          <Route
            exact path={path}
            render = {(props) => (
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
  );
}

export default App;
