import React from 'react'

import './board.css'

import {Paddle} from './paddle'
import {Ball} from './ball'

export const Board = ({size, paddleLeft, paddleRight, ball}) => (
  <div className="board" style={{height: size, width: size * 1.5}}>
    <Paddle color="blue" position={paddleLeft} />
    <Ball position={ball} />
    <Paddle color="green" position={paddleRight} />
  </div>
)
