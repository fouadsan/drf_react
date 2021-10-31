import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Header, Footer } from './components'
import { Home, About, SinglePost, Login, Error } from './pages';

function App() {
  return (
    <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/posts/:id" children={<SinglePost />}
          />
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
    </Router>
  );
}

export default App;
