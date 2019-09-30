import { ACTION_TYPES, DATA_KEY } from "../constants";
import Config from "../config";
import axios from "axios";

const topFreeAppsLimit = 100;
const topGrossingAppsLimit = 10;

const getAppsRating = appsRating => {
  return {
    type: ACTION_TYPES.FETCH_APPS_RATIING,
    payload: {
      appsRating
    }
  };
};

const fetchAppsRating = async apps => {
  let appIDs = apps.reduce((acc, app) => [...acc, app.appID], []);
  let i = 0;
  let appsRating = {};
  while (i < appIDs.length) {
    let ids = appIDs.slice(i, i + 10).join(",");
    const url = Config.getAppAPI({ appID: ids });
    let apps = await axios
      .get(url)
      .then(res => res.data.results)
      .catch(error => {
        throw error;
      });
    for (let i = 0; i < apps.length; i++) {
      let { trackId, averageUserRating = -1 } = apps[i];
      appsRating[trackId] = averageUserRating;
    }
    i += 10;
  }
  return appsRating;
};

export const getTopFreeApps = apps => {
  return {
    type: ACTION_TYPES.FETCH_TOP_FREE_APPS,
    payload: {
      apps
    }
  };
};

export const fetchDataError = ({ key, error }) => {
  return {
    type: ACTION_TYPES.FETCH_DATA_ERROR,
    payload: {
      key,
      error
    }
  };
};

export const fetchTopFreeApps = () => {
  const url = Config.getTopFreeAppsAPI({ limit: topFreeAppsLimit });
  return async dispatch => {
    let apps = await axios
      .get(url)
      .then(res =>
        res.data.feed.entry.map((el, i) => {
          return {
            appID: el.id.attributes["im:id"],
            rank: i + 1,
            title: el["im:name"].label,
            author: el["im:artist"].label,
            imageUrl: el["im:image"][1].label,
            category: el.category.attributes.label,
            summary: el.summary.label
          };
        })
      )
      .catch(error => {
        dispatch(fetchDataError({ key: DATA_KEY.TOP_FREE_APPS, error }));
        throw error;
      });
    dispatch(getTopFreeApps(apps));
    return fetchAppsRating(apps)
      .then(res => dispatch(getAppsRating(res)))
      .catch(error => {
        throw error;
      });
  };
};

export const getTopGrossingApps = apps => {
  return {
    type: ACTION_TYPES.FETCH_TOP_GROSSING_APPS,
    payload: {
      apps
    }
  };
};

export const fetchTopGrossingApps = () => {
  const url = Config.getTopGrossingAppsAPI({ limit: topGrossingAppsLimit });
  return async dispatch => {
    let apps = await axios
      .get(url)
      .then(res =>
        res.data.feed.entry.map((el, i) => {
          return {
            title: el["im:name"].label,
            author: el["im:artist"].label,
            imageUrl: el["im:image"][1].label,
            category: el.category.attributes.label,
            summary: el.summary.label
          };
        })
      )
      .catch(error => {
        dispatch(fetchDataError({ key: DATA_KEY.TOP_GROSSING_APPS, error }));
        throw error;
      });
    dispatch(getTopGrossingApps(apps));
  };
};

export const editSearchKeywords = keywords => {
  return {
    type: ACTION_TYPES.EDIT_SEARCH_KEYWORDS,
    payload: {
      keywords
    }
  };
};
