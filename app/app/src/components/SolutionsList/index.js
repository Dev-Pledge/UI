import React from 'react';

const PledgeList = (props) => {
  if (! props.hasOwnProperty('solutions')) return ''
  if (! props.solutions.constructor === Array) {
    console.error('solutions were not an array')
    return ''
  }

  if (props.solutions.length) return (
    <ul className="pledges-list">
      {props.solutions.map(solution => (
        <li key={solution.id}>
          <div className="row">
            <div className="col-12">
              {/*<span className="text-xs text-muted">{pledge.date}</span>*/}
              <p>{solution.author}</p>
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

export default PledgeList;
