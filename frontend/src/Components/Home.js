import React from 'react'
import Notes from './Notes'

const Home = (props) => {

  return (
    <div className='my-4'>
      <Notes showAlert={props.showAlert} />
    </div>
  )
}

export default Home
