import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/MainPage/MainPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
