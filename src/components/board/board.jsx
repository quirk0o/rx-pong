import React from 'react'

import './board.css'
import {Paddle} from './paddle'

export const Board = ({size, paddleLeft, paddleRight}) => (
  <div className="board" style={{height: size, width: size * 1.5}}>
    <Paddle color="blue" position={paddleLeft} />
    <Paddle color="green" position={paddleRight} />
  </div>
)
