import React from 'react'

export  function AdminLayout(props) {

    const {children} = props;
  return (
    <div>
        <h2>We are using Admin Layout</h2>
        {children}
      
    </div>
  )
}
