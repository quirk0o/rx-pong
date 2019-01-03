import React, {Component} from 'react'
import {fromEvent, interval, merge} from 'rxjs'
import {
  buffer,
  filter,
  map,
  mapTo,
  mergeMap,
  scan,
  startWith,
  takeUntil,
  throttle,
  withLatestFrom
} from 'rxjs/operators'

import {Board} from '../board/board'

const ARROW_UP_KEY_CODE = 38
const ARROW_DOWN_KEY_CODE = 40

const W_KEY_CODE = 87
const S_KEY_CODE = 83

export class Game extends Component {
  static defaultProps = {
    size: 500
  }

  constructor (props) {
    super(props)

    this.state = {paddleLeft: 0, paddleRight: 0, ball: [props.size * 1.5 / 2, props.size / 2]}

    this.keyDown$ = fromEvent(document, 'keydown')

    const isArrowUp = (event) => event.keyCode === ARROW_UP_KEY_CODE
    const keyUp = (keyCode) => fromEvent(document, 'keyup').pipe(filter((event) => event.keyCode === keyCode))
    this.up$ = this.keyDown$.pipe(
      filter(isArrowUp),
      throttle(() => keyUp(ARROW_UP_KEY_CODE)),
      mergeMap(() => interval(10).pipe(startWith(0), takeUntil(keyUp(ARROW_UP_KEY_CODE))))
    )
    const isArrowDown = (event) => event.keyCode === ARROW_DOWN_KEY_CODE
    this.down$ = this.keyDown$.pipe(
      filter(isArrowDown),
      throttle(() => keyUp(ARROW_DOWN_KEY_CODE)),
      mergeMap(() => interval(10).pipe(startWith(0), takeUntil(keyUp(ARROW_DOWN_KEY_CODE))))
    )

    const isW = (event) => event.keyCode === W_KEY_CODE
    this.w$ = this.keyDown$.pipe(
      filter(isW),
      throttle(() => keyUp(W_KEY_CODE)),
      mergeMap(() => interval(10).pipe(startWith(0), takeUntil(keyUp(W_KEY_CODE))))
    )
    const isS = (event) => event.keyCode === S_KEY_CODE
    this.s$ = this.keyDown$.pipe(
      filter(isS),
      throttle(() => keyUp(S_KEY_CODE)),
      mergeMap(() => interval(10).pipe(startWith(0), takeUntil(keyUp(S_KEY_CODE))))
    )

    this.paddleLeft$ = merge(
      this.up$.pipe(
        map(() => pos => pos - 5)
      ),
      this.down$.pipe(
        map(() => pos => pos + 5)
      )
    ).pipe(
      scan((pos, fun) => {
        const newPos = fun(pos)
        if (newPos < 0 || newPos > this.props.size - 1 - 0.15 * this.props.size) return pos
        return newPos
      }, 0)
    )

    this.paddleRight$ = merge(
      this.w$.pipe(
        map(() => pos => pos - 5)
      ),
      this.s$.pipe(
        map(() => pos => pos + 5)
      )
    ).pipe(
      scan((pos, fun) => {
        const newPos = fun(pos)
        if (newPos < 0 || newPos > this.props.size - 1 - 0.15 * this.props.size) return pos
        return newPos
      }, 0)
    )

    this.ball$ = merge(

    ).pipe(
      scan((pos, vec) => {
        console.log(pos, vec)
        return [pos[0] + vec[0], pos[1] + vec[1]]
      }, this.state.ball)
    )

    this.paddleLeft$.subscribe((paddleLeft) => this.setState({paddleLeft}))
    this.paddleRight$.subscribe((paddleRight) => this.setState({paddleRight}))
    this.ball$.subscribe((ball) => this.setState({ball}))
  }

  render () {
    const {size} = this.props
    const {paddleLeft, paddleRight, ball} = this.state

    return <Board size={size} paddleLeft={paddleLeft} paddleRight={paddleRight} ball={ball} />
  }
}
