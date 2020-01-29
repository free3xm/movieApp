import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Header from "./containers/Header/Header";
import MoviesPage from "./containers/MoviesPage/MoviesPage";
import Footer from "./containers/Footer/Footer";
import MainMovie from "./components/MainMovie/MainMovie";
import { fetchLists } from "./store/actions/fetchLists";
import NavBar from "./components/NavBar/NavBar";
import Button from "./components/UI/Button/Button";

class App extends React.Component {
  state = {
    page: 1,
    list: "now_playing"
  };
  componentDidMount() {
    this.props.fetchLists(this.state.list);
  }
  LoadMoreHandler = () => {
    this.props.fetchLists(this.state.list, this.state.page);
    this.setState(() => ({
      page: this.state.page + 1
    }));
    console.log(this.state);
  };
  changeListHandler = list => {
    this.setState(() => ({
      page: 0,
      list
    }));
    this.props.fetchLists(list);
  };
  render() {
    console.log(this.props);
    return (
      <>
        <Layout>
          <NavBar />
          <Header
            movies={this.props.list.now_playing}
            loading={this.props.loading}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <MoviesPage
                  movies={this.props.list[this.state.list]}
                  loading={this.props.loading}
                  clickHandler={this.LoadMoreHandler}
                  changeList={this.changeListHandler}
                />
              )}
            />
            <Route path="/movie/:id" component={MainMovie} />
          </Switch>
          <Footer />
        </Layout>
      </>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return {
    list: state.lists.lists,
    loading: state.lists.loading
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchLists: (list, page) => dispatch(fetchLists(list, page))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
