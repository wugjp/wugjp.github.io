import { listCostumeTweets } from '@/actions/costume'
import SectionHeading from '@/components/common/SectionHeading'
import { getDictionary } from '@/i18n/dictionaries'
import EmbeddedTweet from './EmbeddedTweet'

interface Props {
  costumeId: number
}

const CostumeTweets = async ({ costumeId }: Props) => {
  const { costumes: t } = await getDictionary()
  const tweets = await listCostumeTweets(costumeId)
  return !costumeId || tweets.length > 0 ? (
    <div>
      <SectionHeading title={`💬 ${t.relatedTweets}`} />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {tweets.map((tweet) => {
          return <EmbeddedTweet key={tweet.id} tweetId={tweet.tweetId} />
        })}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default CostumeTweets
