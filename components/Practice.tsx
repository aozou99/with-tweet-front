import React, { useState, VFC } from 'react'
import { TAIL_IS_COMMA_PERIOD } from '../pkg/regex/regexList'
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
      <div className="flex justify-center items-center flex-wrap mb-4 font-bold">
        {answer.map((word, i) => {
          const trimed = word.replaceAll(TAIL_IS_COMMA_PERIOD, '')
          const tail = TAIL_IS_COMMA_PERIOD.test(word) && word.slice(-1)
          const status =
            selected.length - 1 >= i
              ? 'answered'
              : selected.length == i
              ? 'current'
              : 'not_yet'
          return (
            <span key={i}>
              {status === 'answered' ? (
                <a
                  href={`https://ejje.weblio.jp/content/${trimed}`}
                  target="_blank"
                >
                  <Word word={trimed} status={status} />
                </a>
              ) : (
                <Word word={trimed} status={status} />
              )}
              {tail}
            </span>
          )
        })}
      </div>
      <div className="text-center my-2 bg-cyan-100 rounded-md py-1 text-cyan-900">
        {tweet.origin_text}
      </div>
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
            {choice.replaceAll(TAIL_IS_COMMA_PERIOD, '')}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Practice

interface WordProps {
  word: string
  status: 'current' | 'answered' | 'not_yet'
}
const Word: VFC<WordProps> = ({ word, status }) => {
  const cssMap = {
    current:
      'border-cyan-500 border-b-2 text-transparent select-none bg-cyan-100/80 border-solid',
    answered:
      'text-gray-600 border-green-500 border-b hover:text-blue-600 hover:bg-blue-50 hover:rounded-full border-dotted',
    not_yet:
      'border-orange-500 border-b text-transparent select-none border-dotted',
  }
  return (
    <span className={['mx-1 p-1 text-lg', cssMap[status]].join(' ')}>
      {word}
    </span>
  )
}
