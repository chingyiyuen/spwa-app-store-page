export default {
  getTopFreeAppsAPI: ({ limit }) => {
    return `https://itunes.apple.com/hk/rss/topfreeapplications/limit=${limit}/json`;
  },
  getAppAPI: ({ appID }) => {
    return `https://itunes.apple.com/hk/lookup?id=${appID}`;
  },
  getTopGrossingAppsAPI: ({ limit }) => {
    return `https://itunes.apple.com/hk/rss/topgrossingapplications/limit=${limit}/json`;
  }
};
