import React from 'react'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import { Link } from "react-router-dom";

import Loading from '../Loading'

const renderPledges = (count, value) => {
  if (count) return (
    <div>
      <p><span className="pledged">${value}</span> pledged</p>
      <p><span className="backers">{count}</span> backers</p>
    </div>
  )

  return (
    <div>
      <p>Be the first to pledge</p>
    </div>
  )
}

const Problem = (props) => {

  if (! props.problem) return (<Loading />)

  const { problem } = props

  return (
    <div className="content-body">
      <div className="row margin-bottom-30">
        <div className="col-lg-3 text-sm">
          <p>
            By {problem.user.username} <br />
            Active since: {moment.utc(problem.active_datetime).local().format('lll')}
          </p>
        </div>
        <div className="col-lg-9">
          <p className="is-title">{problem.title}</p>
          <p className="margin-bottom-15">{problem.description}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="spec-container">
            <div className="is-descriptor">Specification:</div>
            <ReactMarkdown source={problem.specification} />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="pledge-container">
            {renderPledges(problem.pledges_count, problem.pledges_value)}
            <Link to={`pledge/${problem.problem_id}`}>
              <button className="dp-button is-primary is-block">
                Pledge Now!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Problem;
