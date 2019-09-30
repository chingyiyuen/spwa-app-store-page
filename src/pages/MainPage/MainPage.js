import React, { Suspense }  from 'react';
import SearchBar from '../../containers/SearchBar/SearchBar';
import { SECTION_TITLES, MESSAGES } from '../../constants';
import TopGrossingAppList from '../../containers/TopGrossingAppList/TopGrossingAppList';
import TopFreeAppList from '../../containers/TopFreeAppList/TopFreeAppList';

const MainPage = () => {
  return (
    <div className="mainPage">
      <SearchBar />
      <div className="mainPage-recommandations">
        <div className="mainPage-section-title">{SECTION_TITLES.RECOMMANDATIONS}</div>
        <div className="mainPage-recommandation-list">
          <Suspense fallback={<div className="mainPage-message-noData">{MESSAGES.LOADING}</div>}>
            <TopGrossingAppList />
          </Suspense>
        </div>
      </div>
      <div className="mainPage-freeApps">
        <div className="mainPage-section-title">{SECTION_TITLES.TOP_FREE_APPS}</div>
        <div className="mainPage-freeApps-list">
          <Suspense fallback={<div className="mainPage-message-noData">{MESSAGES.LOADING}</div>}>
            <TopFreeAppList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
