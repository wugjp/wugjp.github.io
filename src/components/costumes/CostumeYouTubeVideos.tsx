import { listYouTubeVideosByCostume } from '@/actions/costume'
import SectionHeading from '@/components/common/SectionHeading'
import VideoItem from '@/components/youtube/VideoItem'
import { getDictionary } from '@/i18n/dictionaries'

interface Props {
  costumeId: number
}

const CostumeYouTubeVideos = async ({ costumeId }: Props) => {
  const items = await listYouTubeVideosByCostume(costumeId)
  const { costumes: t } = await getDictionary()
  return items.length > 0 ? (
    <div>
      <SectionHeading title={`🎬 ${t.relatedVideos}`} />
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 [&_]:text-left'>
        {items.map((item) => {
          return <VideoItem key={item.id} video={item.video} showChannel={true} />
        })}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default CostumeYouTubeVideos
