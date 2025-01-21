import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Song } from '@prisma/client'

interface Props {
  song: Song
}

const SongMetadata = async ({ song }: Props) => {
  const { kana, title, titleEn, jasracCode, iswcCode } = song
  const { songs: t } = await getDictionary()
  return (
    <div className='py-4'>
      <div className='text-xs text-gray-500'>{kana}</div>
      {!isDefaultLocale && <div className='text-xs text-gray-500'>{title}</div>}
      <h2 className='font-bold text-lg mb-2'>{isDefaultLocale ? title : titleEn}</h2>
      {jasracCode && (
        <div className='text-xs text-gray-500'>
          {t.jasracCode}: {jasracCode}
        </div>
      )}
      {iswcCode && (
        <div className='text-xs text-gray-500'>
          {t.iswcCode}: {iswcCode}
        </div>
      )}
    </div>
  )
}

export default SongMetadata
