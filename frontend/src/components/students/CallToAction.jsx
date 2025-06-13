import { ArrowRight } from 'lucide-react'
import React from 'react'
import '../../styles/CallToAction.css'

const CallToAction = () => {
  return (
    <div className='action'><h1>Learn anything, anytime, anywhere.</h1>
    <p>
    Connect, learn, and interact with industry professionals to boost your skills and grow your career.
    </p>
    <div className='action_btn'>
      <button className='start_btn'>Get Started</button>
      <button className='learn_btn'>Learn More <ArrowRight /></button> 
    </div>
    </div>
  )
}

export default CallToAction