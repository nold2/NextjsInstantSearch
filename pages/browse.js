import React from "react";
import Router from "next/router";
import qs from "qs";
import PropTypes from "prop-types";
import App from "../components/browse/instantSearch/App";
import { Head, findResultsState } from "../components/browse/instantSearch/Index";

const UPDATE_AFTER = 700;
const createURL = state => `?${qs.stringify(state)}`;
const searchStateUrl = searchState => searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : "";


class Browse extends React.Component {
  state = {
    searchState: this.props.searchState,
  };
  static async getInitialProps(params) {
    const searchState = params.asPath.includes("?")
    ? qs.parse(params.asPath.substring(params.asPath.indexOf("?") + 1)) : {};
    const resultState = await findResultsState(App, { searchState });
    return {resultState, searchState};
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState);
    this.debouncedSetState = setTimeout(()=>{
      const href = searchStateUrl(searchState);
      Router.push(href, href, {
        shallow:true,
      });
    }, UPDATE_AFTER);
    this.setState({
      searchState,
    });
  };
  componentDidMount() {
    this.setState({
      searchState: qs.parse(window.location.search.slice(1))
    });
  }
  componentWillReceiveProps() {
    this.setState({
      searchState: qs.parse(window.location.search.slice(1))
    });
  }

  render(){
    return (
      <div>
        <Head>
          <App
          searchState={this.state && this.state.searchState
            ? this.state.searchState
            : this.props.searchState}
          resultsState={this.state.resultState}
          onSearchStateChange={this.onSearchStateChange}
          createURL={createURL}
          />
        </Head>
      </div>
    );
  }
  static propTypes = {
    resultsState: PropTypes.object,
    searchState: PropTypes.object,
  };
}

export default Browse;
