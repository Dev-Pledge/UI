import React from 'react'
import moment from 'moment'

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
          <div className="row">
            <div className="col-12">
              <a href={solution.open_source_location} target="_blank">{solution.name}</a>
              <div className="text-muted text-sm">{solution.user.username} @ {moment.utc(solution.created).local().format('lll')}</div>
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
            Currently no solutions
          </div>
        </div>
      </li>
    </ul>
  )
}

export default SolutionsList;
