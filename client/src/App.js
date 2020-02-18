import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Header from "./containers/Header/Header";
import MoviesPage from "./containers/MoviesPage/MoviesPage";
import Footer from "./containers/Footer/Footer";
import MainMovie from "./containers/MainMovie/MainMovie";
import { fetchLists } from "./store/actions/fetchLists";
import NavBar from "./containers/NavBar/NavBar";
import Auth from "./containers/Auth/Auth";
import { autoLogin } from "./store/actions/auth";

class App extends React.Component {
  state = {
    page: 1,
    list: "now_playing"
  };
  componentDidMount() {
    this.props.fetchLists(this.state.list);
    this.props.autoLogin();
  }

  LoadMoreHandler = () => {
    this.props.fetchLists(this.state.list, this.state.page);
    this.setState(() => ({
      page: this.state.page + 1
    }));
  };

  changeListHandler = list => {
    if (list === this.state.list) return;
    this.setState(() => ({
      page: 1,
      list
    }));
    this.props.fetchLists(list);
  };

  render() {
    return (
      <>
        <Layout>
          <NavBar />
          <Header
            movies={this.props.list.now_playing}
            loading={this.props.headerLoading}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <MoviesPage
                  activeList={this.state.list}
                  movies={this.props.list[this.state.list]}
                  loading={this.props.loading}
                  clickHandler={this.LoadMoreHandler}
                  changeList={this.changeListHandler}
                />
              )}
            />
            <Route path="/auth" exact component={Auth} />
            <Route path="/movie/:id" component={MainMovie} />
          </Switch>
          <Footer />
        </Layout>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    list: state.lists.lists,
    loading: state.lists.loading,
    headerLoading: state.lists.headerLoading
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchLists: (list, page) => dispatch(fetchLists(list, page)),
    autoLogin: () => dispatch(autoLogin())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
