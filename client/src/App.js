import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Header from "./containers/Header/Header";
import MoviesPage from "./containers/MoviesPage/MoviesPage";
import Footer from "./containers/Footer/Footer";
import MainMovie from "./components/MainMovie/MainMovie";
import { fetchLists } from "./store/actions/fetchLists";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchLists();
  }
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Layout>
          <Header movies={this.props.list} loading={this.props.loading} />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <MoviesPage
                  movies={this.props.list}
                  loading={this.props.loading}
                />
              )}
            />
            <Route path="/movie/:id" component={MainMovie} />
          </Switch>
          <Footer />
        </Layout>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    list: state.lists.list,
    loading: state.lists.loading
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchLists: () => dispatch(fetchLists())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
