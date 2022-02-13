import { VFC } from 'react'
import { TranslatedTweet } from '../types/types'

interface Props {
  translatedTweet: TranslatedTweet
}

export const TranslatedTweetItem: VFC<Props> = ({ translatedTweet }) => {
  return (
    <li key={translatedTweet.tweet_id}>
      <p className="my-3 font-bold text-blue-500">
        {translatedTweet.origin_text}
      </p>
      <p className="my-3 font-bold text-green-500">
        {translatedTweet.translated_text}
      </p>
    </li>
  )
}
