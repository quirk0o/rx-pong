import React from 'react'

import './paddle.css'

export const Paddle = ({color}) => (
  <div className="board__paddle" style={{background: color}}/>
)
