import React from 'react'

import './paddle.css'

export const Paddle = ({color, position}) => (
  <div className="board__paddle" style={{background: color, top: position}}/>
)
