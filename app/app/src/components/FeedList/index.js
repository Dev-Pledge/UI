import React from 'react';
import FeedItem from '../FeedItem'

const FeedList = (props) => (
  <div className="feed-list">
    <ul>
      {props.list.map(item => (
        <li key={item.id}>
          <FeedItem key={item.id} item={item}></FeedItem>
        </li>
      ))}
    </ul>
  </div>
)

export default FeedList;

