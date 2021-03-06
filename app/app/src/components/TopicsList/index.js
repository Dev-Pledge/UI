import React from 'react';

const TopicsList = (props) => {
  if (! props.hasOwnProperty('topics')) return ''
  if (! props.topics.constructor === Array) {
    console.error('topics were not an array')
    return ''
  }

  const extraClassList = props.extraTagClases ? props.extraTagClases : ''

  if (props.topics.length) return (
    <div className="tags with-tags-first">
      {props.topics.map(topic => (
        <span key={topic} className={`tag ${extraClassList}`}>
          {topic}
        </span>
      ))}
    </div>
  )

  return (
    <div>
      Currently no topics
    </div>
  )
}

export default TopicsList;
