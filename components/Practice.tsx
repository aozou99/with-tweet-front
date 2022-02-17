import React, { useState, VFC } from 'react'
import { PracticeTweet } from '../types/types'

interface Props {
  tweet: PracticeTweet
}
const Practice: VFC<Props> = ({ tweet }) => {
  const answer = tweet.translated_text.split(' ')
  const [selected, setSelected] = useState<number[]>([])
  const [wrongChoice, setWrongChoice] = useState<number[]>([])
  const select = (index: number) => {
    return (_: React.MouseEvent<HTMLInputElement>) => {
      if (answer[selected.length] === tweet.choices[index]) {
        setSelected([...selected, index])
        setWrongChoice([])
      } else {
        setWrongChoice([...wrongChoice, index])
      }
    }
  }
  return (
    <div className="max-w-screen-md">
      <div className="underline underline-offset-4 decoration-dotted text-transparent decoration-orange-500 flex-wrap mb-4 font-bold">
        {answer.map((word, i) => (
          <span
            key={i}
            className={[
              'mx-1',
              selected.length - 1 >= i ? 'text-gray-600' : '',
            ].join(' ')}
          >
            {word}
          </span>
        ))}
      </div>
      <div className="text-center my-2">{tweet.origin_text}</div>
      <div className="flex justify-center flex-wrap">
        {tweet.choices.map((choice, i) => (
          <button
            key={i}
            className={[
              'rounded-full py-1 px-4 mx-1 my-1',
              selected.includes(i)
                ? ' bg-blue-400 text-red-50'
                : wrongChoice.includes(i)
                ? 'bg-gray-500 text-gray-400'
                : 'bg-lime-300 hover:bg-lime-400 text-yellow-900',
            ].join(' ')}
            onClick={select(i)}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Practice
