import { Layout } from '../../components/Layout'
import Practice from '../../components/Practice'
import {
  fetchTranslatedTweet,
  fetchTranslatedTweetIds,
} from '../../hooks/useQueryTranslatedTweet'
import { shuffle } from '../../pkg/random/shuffle'
import Tweet from '../../static-tweet/components/post/tweet'
import getTweets, { Tweets } from '../../static-tweet/lib/get-tweets'
import { Tweets as TweetsContext } from '../../static-tweet/lib/tweets'
import { PracticeTweet } from '../../types/types'

interface Props {
  tweet: PracticeTweet
  tweets: Tweets
}

export default function Translate({ tweet, tweets }: Props) {
  if (!tweet) {
    return <Layout title="wait">Loading...</Layout>
  }
  return (
    <Layout title="translate">
      <TweetsContext.Provider value={tweets}>
        <Tweet key={tweet.tweet_id} id={tweet.tweet_id} />
      </TweetsContext.Provider>

      <Practice tweet={tweet} />
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const ids = await fetchTranslatedTweetIds()
  return { paths: ids.map((v) => `/translate/${v}`), fallback: true }
}

type StaticProps = { params: { id: string } }
export const getStaticProps = async ({ params }: StaticProps) => {
  const tweet = await fetchTranslatedTweet(params.id)
  const ptcTweet: PracticeTweet = {
    ...tweet,
    choices: shuffle([...tweet.translated_text.split(' ')]),
  }
  const tweets = await getTweets([params.id])
  return {
    props: { tweet: ptcTweet, tweets },
    revalidate: 1,
  }
}
