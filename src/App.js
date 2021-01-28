import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import Post from './pages/Post'
import Page from './pages/Page'
import CPT from './pages/CPT'

const GQLUrl = (process.env.NODE_ENV === 'production') ? 'YOUR_DOMAIN' : 'localhost:8080';
console.log(process.env.NODE_ENV);
const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://' + GQLUrl + '/graphql'
  }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router
      basename={process.env.PUBLIC_URL}
    >
      <div className="App">
        <header>
          <h1>Play GQL</h1>
          <nav>
            <ul>
              <li><NavLink exact to="/" activeClassName="active">HOME</NavLink></li>
              <li><NavLink exact to="/post" activeClassName="active">POST</NavLink></li>
              <li><NavLink exact to="/page" activeClassName="active">PAGE</NavLink></li>
              <li><NavLink exact to="/cpt" activeClassName="active">CPT</NavLink></li>
            </ul>
          </nav>
        </header>
        <main>
          <ApolloProvider client={client}>
            <Switch>
              <Route exact path="/">
                <h2 className="title">Home</h2>
                <p className="text-center">React에서 GraphQL을 활용하여 Wordpress 서버와 통신해 데이터를 출력하는 데모 페이지.</p>
              </Route>
              <Route exact path="/post">
                <h2 className="title">Post</h2>
                <Post />
              </Route>
              <Route exact path="/page">
                <h2 className="title">Page - '샘플 페이지'</h2>
                <Page />
              </Route>
              <Route exact path="/cpt">
                <h2 className="title">Custom Post Type - '사진'</h2>
                <CPT />
              </Route>
            </Switch>
          </ApolloProvider>
        </main>
        <footer>
          @kaldi
      </footer>
      </div>
    </Router>
  );
}

export default App;
