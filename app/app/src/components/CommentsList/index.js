import React from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom'

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
          <div className="text-muted text-sm">
            <Link to={`user/${comment.user.username}`}>{comment.user.username}</Link> @ {moment.utc(comment.created).local().format('lll')}
          </div>
          <div>{comment.comment}</div>
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
