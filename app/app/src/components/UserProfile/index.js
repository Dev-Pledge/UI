import React from 'react'
import moment from 'moment'

const userProfile = (props) => {
  if (props.user) return (
    <div className="row">
      <div className="col">
        <p>username: {props.user.username}</p>
        <p>member since: {moment.utc(props.created).local().format('lll')}</p>
      </div>
    </div>
  )

  return ''
}

export default userProfile;
