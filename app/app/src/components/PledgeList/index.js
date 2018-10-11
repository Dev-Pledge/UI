import React from 'react'

const PledgeList = (props) => {
  if (! props.hasOwnProperty('pledges')) return ''
  if (! props.pledges.constructor === Array) {
    console.error('pledges were not an array')
    return ''
  }

  if (props.pledges.length) return (
    <ul className="pledges-list">
      {props.pledges.map(pledge => (
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
  )

  return (
    <ul className="pledges-list">
      <li>
        <div className="row">
          <div className="col">
            Currently no pledges
          </div>
        </div>
      </li>
    </ul>
  )
}

export default PledgeList;
