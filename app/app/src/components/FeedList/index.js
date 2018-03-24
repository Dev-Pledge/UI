import React from 'react';
import FeedItemDefault from '../FeedItem/default'
import FeedItemPledge from '../FeedItem/pledge'

const FeedList = (props) => {
  const renderFeedType = (item) => {
    // switch on the various types of feed data
    switch (item.type) {
      case 'pledge':
        return <FeedItemPledge item={item}/>
      default:
        return <FeedItemDefault item={item}/>
    }
  }

  return (
    <div className="feed-list">
      <ul>
        {props.list.map(item => (
          <li key={item.id}>
            {renderFeedType(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedList

