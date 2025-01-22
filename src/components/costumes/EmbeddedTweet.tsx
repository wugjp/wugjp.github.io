'use client'

import { Tweet } from 'react-twitter-widgets'

type Props = {
  tweetId: string
}

const EmbeddedTweet = ({ tweetId }: Props) => {
  return <Tweet tweetId={tweetId} />
}

export default EmbeddedTweet
