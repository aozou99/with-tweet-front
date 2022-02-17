export interface TranslatedTweet {
  tweet_id: string
  origin_text: string
  translated_text: string
}

export interface PracticeTweet extends TranslatedTweet {
  choices: string[]
}
