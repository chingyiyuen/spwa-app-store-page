import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { editSearchKeywords } from '../../actions';

const mapStateToProps = state => {
  return { keyword: state.searchKeywords };
};

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(editSearchKeywords(e.target.value))
});

const SearchBar = ({ keyword, onChange }) => {
  return (
    <div className="searchBar">
      <FontAwesomeIcon className="searchBar-icon" icon={['fas', 'search']} />
      <input
        className="searchBar-input"
        type="text"
        onChange={onChange}
        placeholder="搜索 (名稱、作者、類別、簡介)"
        value={keyword}
      />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
