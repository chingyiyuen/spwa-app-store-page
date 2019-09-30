import React from "react";
import { Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import LazyLoad from "react-lazyload";
import AppItem from "../../components/AppItem/AppItem";
import { MESSAGES, DATA_KEY } from "../../constants";
import { connect } from "react-redux";
import { getFilteredTopFreeApps } from "../../selectors";

const mapStateToProps = state => {
  return {
    apps: getFilteredTopFreeApps(state),
    appsRating: state.appsRating,
    searchKeywords: state.searchKeywords,
    error: state.errors[DATA_KEY.TOP_GROSSING_APPS]
  };
};
class TopFreeAppList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePageIndex: 0,
      itemsPerPage: 10
    };
  }

  getTotalPages = () => {
    return Math.ceil(this.props.apps.length / this.state.itemsPerPage);
  };

  handleChangeActivePage = pageIndex => {
    this.setState({ activePageIndex: pageIndex });
  };

  render() {
    let { itemsPerPage, activePageIndex } = this.state;
    let { apps, searchKeywords, error } = this.props;
    let offset =
      apps.length > itemsPerPage ? activePageIndex * itemsPerPage : 0;
    let filteredApps = apps.slice(offset, offset + itemsPerPage);

    return error ? (
      <div className="mainPage-message-noData">{MESSAGES.FETCH_DATA_ERROR}</div>
    ) : filteredApps.length === 0 && searchKeywords ? (
      <div className="mainPage-message-noData">{MESSAGES.NO_MATCHING_DATA}</div>
    ) : (
      <Row>
        <Col sm={12}>
          <ReactPaginate
            previousLabel={activePageIndex === 0 ? "" : "<"}
            nextLabel={activePageIndex + 1 === this.getTotalPages() ? "" : ">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.getTotalPages()}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={({ selected }) =>
              this.handleChangeActivePage(selected)
            }
            containerClassName={"pagination topFreeAppList-pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </Col>
        {filteredApps.map((app, i) => (
          <Col lg={12} sm={12} xs={12} key={i}>
            <LazyLoad height={100}>
              <AppItem
                data={app}
                rating={this.props.appsRating[app.appID]}
                isRoundedImage={i % 2 === 1}
              />
            </LazyLoad>
          </Col>
        ))}
      </Row>
    );
  }
}

export default connect(mapStateToProps)(TopFreeAppList);
