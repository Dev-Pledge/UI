import React from 'react'
import { Link } from "react-router-dom";
import moment from 'moment'

const renderPledge = (props) => {
  if (props.problem_id) return (
    <div>
      <Link to={`pledge/${props.problem_id}`}>
        Pledge Here
      </Link>
    </div>
  )
}

const PledgeList = (props) => {
  if (! props.hasOwnProperty('pledges')) return ''
  if (! props.pledges.constructor === Array) {
    console.error('pledges were not an array')
    return ''
  }

  console.log('pledges', props.pledges)

  if (props.pledges.length) return (
    <div>
      {renderPledge(props)}
      <ul className="pledges-list">
        {props.pledges.map(pledge => (
          <li key={pledge.pledge_id}>
            <div className="text-muted text-sm">
              <Link to={`user/${pledge.user.username}`} >{pledge.user.username}</Link> @ {moment.utc(pledge.date).local().format('lll')}
            </div>
            <div>value: {pledge.value}</div>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <ul className="pledges-list">
      <li>
        <div className="row">
          <div className="col">
            Be this first to pledge!
            {renderPledge(props)}
          </div>
        </div>
      </li>
    </ul>
  )
}

export default PledgeList;
