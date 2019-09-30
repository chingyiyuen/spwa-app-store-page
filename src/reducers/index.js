import { ACTION_TYPES } from "../constants";

const initialState = {
  topFreeApps: [],
  topGrossingApps: [],
  appsRating: {},
  searchKeywords: "",
  errors: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.FETCH_TOP_FREE_APPS:
      return { ...state, topFreeApps: payload.apps };
    case ACTION_TYPES.FETCH_TOP_GROSSING_APPS:
      return { ...state, topGrossingApps: payload.apps };
    case ACTION_TYPES.FETCH_APPS_RATIING:
      let ratings = { ...state.appsRating, ...payload.appsRating };
      return { ...state, appsRating: ratings };
    case ACTION_TYPES.EDIT_SEARCH_KEYWORDS:
      return {
        ...state,
        searchKeywords: payload.keywords
      };
    case ACTION_TYPES.FETCH_DATA_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [payload.key]: payload.error
        }
      };
    default:
      return state;
  }
};
