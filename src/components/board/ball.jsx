import React from 'react'

import './ball.css'

export const Ball = ({position}) => (
  <div className="board__ball" style={{top: position[1] - 12, left: position[0] - 12}} />
)
