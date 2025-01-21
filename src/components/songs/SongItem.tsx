import { isDefaultLocale } from '@/i18n/config'
import { Urls } from '@/lib/urls'
import { Song } from '@prisma/client'
import Link from 'next/link'

interface Props {
  song: Song
}

const SongItem = async ({ song }: Props) => {
  const { id, title, titleEn } = song
  // const { songs: t } = await getDictionary()
  return (
    <Link href={`/songs/${id}`} prefetch={false}>
      <div className='grid grid-cols-3 bg-white hover:bg-gray-100 rounded-lg border overflow-hidden p-2 text-left'>
        <div className='col-span-1'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className='w-full object-cover aspect-square' src={Urls.noImage} alt={title} loading='lazy' />
        </div>
        <div className='col-span-2 pl-4'>
          <div className='mb-2 tracking-wide text-sm font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap'>{isDefaultLocale ? title : titleEn}</div>
        </div>
      </div>
    </Link>
  )
}

export default SongItem
