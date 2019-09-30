import React from "react";
import AppItemShrink from "../../components/AppItemShrink/AppItemShrink";
import { MESSAGES, DATA_KEY } from "../../constants";
import { connect } from "react-redux";
import { getFilteredTopGrossingApps } from "../../selectors";

const mapStateToProps = state => {
  return {
    apps: getFilteredTopGrossingApps(state),
    keywords: state.searchKeywords,
    error: state.errors[DATA_KEY.TOP_FREE_APPS]
  };
};

const TopGrossingAppList = ({ apps, keywords, error }) => {
  return error ? (
    <div className="mainPage-message-noData">{MESSAGES.FETCH_DATA_ERROR}</div>
  ) : apps.length === 0 && keywords ? (
    <div className="mainPage-message-noData">{MESSAGES.NO_MATCHING_DATA}</div>
  ) : (
    apps.map((app, i) => <AppItemShrink key={i} data={app} />)
  );
};

export default connect(mapStateToProps)(TopGrossingAppList);
