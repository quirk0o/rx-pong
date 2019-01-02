import React from 'react'

import './board.css'
import {Paddle} from './paddle'

export const Board = () => (
  <div className="board">
    <Paddle color="blue" />
    <Paddle color="green" />
  </div>
)
