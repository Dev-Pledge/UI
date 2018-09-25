import React from 'react';

const CommentsList = (props) => {
  if (! props.hasOwnProperty('comments')) return ''
  if (! props.comments.constructor === Array) {
    console.error('not an array')
    return ''
  }

  if (props.comments.length) return (
    <ul className="pledges-list">
      {props.comments.map(comment => (
        <li key={comment.comment_id}>
          <div className="row">
            <div className="col-12">
              {/*<span className="text-xs text-muted">{pledge.date}</span>*/}
              <p>{comment.comment}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )

  return (
    <ul className="pledges-list">
      <li>
        <div className="row">
          <div className="col">
            Currently no comments
          </div>
        </div>
      </li>
    </ul>
  )
}

export default CommentsList;
