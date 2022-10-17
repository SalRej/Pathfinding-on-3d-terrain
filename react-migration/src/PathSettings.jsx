import React from 'react'

function PathSettings() {
  return (
    <main>
        <input type="radio" id="start" name='positions'></input>
        <label htmlFor="start">Start</label>

        <input type="radio" id="end" name='positions'></input>
        <label htmlFor="end">End</label>
    </main>
  )
}

export default PathSettings