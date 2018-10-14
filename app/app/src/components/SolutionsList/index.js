import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { limitLength } from '../../utils'

const SolutionsList = (props) => {

  if (! props.hasOwnProperty('solutions')) return ''
  if (props.solutions.constructor !== Array) {
    console.error('solutions were not an array')
    return ''
  }

  if (props.solutions.length) return (
    <ul className="pledges-list">
      {props.solutions.map(solution => (
        <li key={solution.solution_id}>
            <span>
              <Link to={`/solution/${solution.solution_id}`}>{solution.name}</Link>
            </span>

            <span>
              &nbsp;<span className="text-muted">External repo:</span>&nbsp;
              <a href={solution.open_source_location} className="text-secondary" target="_blank">{limitLength(solution.open_source_location, 20)}</a>
            </span>
            <div className="text-muted text-sm">
              <Link to={`/user/${solution.user.username}`}>{solution.user.username}</Link> @ {moment.utc(solution.created).local().format('lll')}
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
            Currently no solutions
          </div>
        </div>
      </li>
    </ul>
  )
}

export default SolutionsList;
