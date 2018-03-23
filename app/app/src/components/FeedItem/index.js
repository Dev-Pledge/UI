import React from 'react';

const FeedItem = (props) => (
  <div>
    <p>{props.item.title} - {props.item.time}</p>
    <p>{props.item.content}</p>
  </div>
);

export default FeedItem;

