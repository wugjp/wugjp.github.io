import { YouTubeChannel } from '@prisma/client'
import Link from 'next/link'

interface Props {
  channel: YouTubeChannel
}

const ChannelItem = ({ channel }: Props) => {
  return (
    <Link href={`/youtube/channels/${channel.id}`} prefetch={false} className='px-2 py-1 rounded hover:bg-gray-200'>
      <div className='grid grid-cols-4 content-center'>
        <div className='col-span-3 px-2 flex items-center text-gray-500 overflow-hidden overflow-ellipsis'>{channel.title}</div>
      </div>
    </Link>
  )
}

export default ChannelItem
