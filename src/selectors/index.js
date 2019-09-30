import { createSelector } from "reselect";

const getKeyword = state => state.searchKeywords.trim();
const getTopFreeApps = state => state.topFreeApps;

const filterApps = (apps, searchKeywords) => {
  const regex = new RegExp(searchKeywords, "gi");
  return apps.filter(
    app =>
      app.title.match(regex) ||
      app.author.match(regex) ||
      app.category.match(regex) ||
      app.summary.match(regex)
  )
} 

export const getFilteredTopFreeApps = createSelector(
  [getKeyword, getTopFreeApps],
  (searchKeywords, topFreeApps) => {
    return searchKeywords !== ""
      ? filterApps(topFreeApps, searchKeywords)
      : topFreeApps;
  }
);

const getTopGrossingApps = state => state.topGrossingApps;

export const getFilteredTopGrossingApps = createSelector(
  [getKeyword, getTopGrossingApps],
  (searchKeywords, topGrossingApps) => {
    return searchKeywords !== ""
      ? filterApps(topGrossingApps, searchKeywords)
      : topGrossingApps;
  }
);
