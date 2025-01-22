import { CacheTag } from '@/lib/cache'
import { timestampToJSTString } from '@/lib/datetime'
import prisma from '@/lib/prisma'
import { Urls } from '@/lib/urls'
import { YouTubeVideo } from '@prisma/client'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'

interface Props {
  video: YouTubeVideo
  showChannel?: boolean
}

const videoItem = async ({ video, showChannel }: Props) => {
  const channelTitle = showChannel && video ? (await getYouTubeChannelTitle(video.channelId))?.title : undefined
  return (
    <div>
      <Link href={video ? Urls.youtubeVideo(video.id) : '#'} target='_blank' className='hover:bg-gray-200 rounded-lg'>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={video ? Urls.youtubeThumbnail(video.id) || Urls.noImage : Urls.blankImage} alt={video ? video.title : 'loading...'} className={`w-full aspect-video object-cover rounded-lg ${!video && 'opacity-10 animate-pulse'}`} />
        </div>
        <div className='p-1 grid gap-1'>
          <div className='text-xs text-gray-500'>{video.publishedTimestamp ? timestampToJSTString(video.publishedTimestamp) : video.publishedTimestamp}</div>
          <div className='text-xs'>{video.title}</div>
          {channelTitle && <div className='text-xs text-gray-500'>{channelTitle}</div>}
        </div>
      </Link>
    </div>
  )
}

const getYouTubeChannelTitle = unstable_cache(
  async (id: string) =>
    prisma.youTubeChannel.findUnique({
      select: {
        title: true,
      },
      where: {
        id,
      },
    }),
  undefined,
  { tags: [CacheTag('YouTube')] }
)

export default videoItem
