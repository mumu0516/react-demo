import React from 'react';
import ReactDOM from 'react-dom';
import CommentApp from './CommentApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommentApp />, div);
});
