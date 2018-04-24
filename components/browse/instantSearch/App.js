import React, {Component} from "react";
import {withStyles} from "material-ui/styles";
import withRoot from "../../../services/withRoot";
import PropTypes from "prop-types";
import { InstantSearch } from "./InstantSearch";
import Results from "../../browse/Results";
import Filters from "../../browse/Filters";
import Maps from "../../Maps/Maps";
import BrowsePageHeader from "../../browse/BrowsePageHeader";
import {
  Card, CardTitle,
} from "reactstrap";

import {
  SearchBox,
  Pagination,
  Configure,
} from "react-instantsearch/dom";

import {Container, Row, Col} from "reactstrap";

import {
  connectHits,
  connectRefinementList,
} from "react-instantsearch/connectors";
import env from "../../../env.config";
import fonts from "../../../lib/fonts";
import geolocation from "../../../lib/geoLocation";

const styles = theme => ({
  root: {
    padding: "20px 15px",
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  gridContainer: {
    height: "100%",
  },
  btn: {
    fontSize: 16,
    fontWeight: 600,
    "&:focus": {
      outline: 0
    },
    "&:hover": {
      outline: 0
    }
  },
  input: {
    borderRadius: 30,
  },
  inputSearch: {
    maxWidth: "100%",
    "@media (min-width: 600px)": {padding: "0 15px"},
    "@media (max-width: 599px)": {padding: "15px 0", width: "400px", margin: "auto"}
  },
  loginContainer: {
    maxWidth: "100%",
    flexBasis: "unset",
    "@media (max-width: 767px)": {margin: "auto"}
  },
  maxWidth100: {
    maxWidth: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  topRightButton: {
    fontSize: 16,
    fontWeight: 600,
    "&:focus": {
      outline: 0
    },
    "&:hover": {
      outline: 0
    }
  },
  width50: {
    textAlign: "center",
    margin: "0 5px",
  },
  aga: {
    logoContainer: {
      margin: "auto",
    },
    img: {
      height: 40,
      width: "auto",
      padding: "0 15px",
      "@media (max-width: 767px)": {height: "32px"}
    },
  }
});
class App extends Component {
  constructor(){
    super();
    this.state = {
      center:  {lat: -6.175392, lng: 106.827153}
    };
  }
  componentDidMount() {
    fonts();
    geolocation(this.successGetLocation, this.errorGetLocation);
  }
  successGetLocation = (pos) =>{
    const {latitude, longitude} = pos.coords;
    const center = {lat: latitude, lng: longitude};
    this.setState({center});
  };
  errorGetLocation = (error) => console.warn(`${error.code}: ${error.message}`);
  MyHits = () => connectHits(hits => Results(hits));
  HitFacet = () => connectRefinementList(({items, refine, field}) => Filters({items, refine, field}));
  render() {
    const {
      ALGOLIA_APP_ID,
      ALGOLIA_API_KEY,
      ALGOLIA_ORGANIZATION_INDEX,
    } = env;
    return (
      <InstantSearch
        appId={ALGOLIA_APP_ID}
        apiKey={ALGOLIA_API_KEY}
        indexName={ALGOLIA_ORGANIZATION_INDEX}
        resultsState={this.props.resultsState}
        onSearchStateChange={this.onSearchStateChange}
        searchState={this.props.searchState}
        createURL={this.createURL}
      >
        <Configure hitsPerPage={10}/>
        <BrowsePageHeader search={<SearchBox/>}/>
        <Container style={styles.root}>
          <Row>
            <Col style={{marginTop: 10}} sm="3">
              <Card>
                <CardTitle style={{marginLeft: 10, marginBottom: 20, marginTop: 20}}>
                  Location Nearby:
                </CardTitle>
                <div style={{height: "250px"}}>
                  <Maps center={this.state.center}/>
                </div>
              </Card>
              <Card>
                <CardTitle style={{marginLeft: 10, marginBottom: 20, marginTop: 20}}>
                  Filter By:
                </CardTitle>
                <this.HitFacet attribute="_tags" operator="or" limit={10} field={"Tags"}/>
                <this.HitFacet attribute="categories" operator="or" limit={10} field={"Categories"}/>
                <this.HitFacet attribute="cities" operator="or" limit={10} field={"Cities"}/>
              </Card>
            </Col>
            <Col>
              <this.MyHits/>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{size: 6, offset: 3}}>
              <Pagination/>
            </Col>
          </Row>
        </Container>
      </InstantSearch>
    );
  }
  static propTypes = {
    searchState: PropTypes.object,
    resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSearchStateChange: PropTypes.func,
    createURL: PropTypes.func,
  };
}

export default withRoot(withStyles(styles)(App));
