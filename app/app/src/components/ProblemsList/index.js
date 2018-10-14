import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const ProblemsList = (props) => {

  if (! props.hasOwnProperty('problems')) return ''
  if (props.problems.constructor !== Array) {
    console.error('problems were not an array')
    return ''
  }

  if (props.problems.length) return (
    <ul className="pledges-list">
      {props.problems.map(problem => (
        <li key={problem.problem_id}>
          <Link to={`/problem/${problem.problem_id}`}>{problem.title}</Link>
          <div>{problem.description}</div>
          <div className="text-muted text-sm">
            <Link to={`/user/${problem.user.username}`}>{problem.user.username}</Link> @ {moment.utc(problem.created).local().format('lll')}
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
            Currently no problems suggested
          </div>
        </div>
      </li>
    </ul>
  )
}

export default ProblemsList;
