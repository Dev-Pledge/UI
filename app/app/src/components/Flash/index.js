import React from 'react';

const Flash = (props) => {

  if (props.errorMessage) return (
    <div className="flash-message">
      {props.errorMessage}
    </div>
  )

  return (<div></div>)
}

export default Flash