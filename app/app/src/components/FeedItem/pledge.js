import React from 'react';

const FeedItemPledge = (props) => {
  const renderCtaPledge = () => {
    if (props.item.hasPledged) {
      return <button>Pledge</button>
    }
    return <button>Pledge some more!</button>
  }

  const renderCtaSolution = () => {
    if (props.item.hasCommitted) {
      return <button>I'm working on a solution</button>
    }
    return <span className="text-primary">You are already working on this!</span>
  }

  return (
    <div className="row">
      <div className="col-8">
        <div className="inner-header is-light">
          <span className="tags with-tags-first">
            {props.item.tags.map(tag => (
              <span className="is-primary with-fill">{tag}</span>
            ))}
          </span>
          <span className="title">{props.item.title}</span>
        </div>
        <div className="inner">
          {/*<p>{props.item.time}</p>*/}
          <p>{props.item.content}</p>
          {renderCtaSolution()}
          {renderCtaPledge()}
        </div>
      </div>
      <div className="col-4">
        <div className="inner-header is-primary">
          <span className="title">Pledges</span>
          <span className="tags is-right">
            <span className="is-primary with-fill">
              {props.item.pledge.totalPledges}
            </span>
            <span className="is-primary with-fill">
              {props.item.pledge.totalPledgesValue}
            </span>
          </span>
        </div>
          <ul className="pledges-list">
            {props.item.pledge.lastPledges.map(pledge => (
              <li key={pledge.id}>
                <div className="row">
                  <div className="col-9">
                    {/*<span className="text-xs text-muted">{pledge.date}</span>*/}
                    <p>{pledge.name}</p>
                  </div>
                  <div className="col-3">
                    <div className="has-text-right">
                      <p>{pledge.value}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
      </div>
    </div>
  )
};

export default FeedItemPledge;

