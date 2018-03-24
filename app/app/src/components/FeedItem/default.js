import React from 'react';

const FeedItemDefault = (props) => (
  <div>
    <div className="inner-header is-light">
      <span className="title">Default type - probably be a few types</span>
    </div>
    <div className="inner">
      <p>{props.item.title} - {props.item.time}</p>
      <p>{props.item.content}</p>
    </div>
  </div>
);

export default FeedItemDefault;

