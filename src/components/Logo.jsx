import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div>
      <img
        src={'../public/logo.png'}  // Update this path
        alt="Company Logo"
        style={{ width: width }}
      />
    </div>
  )
}

export default Logo