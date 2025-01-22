import { Urls } from '@/lib/urls'

interface Props {
  imageKey?: string
  size: '240' | '600' | '1024'
  alt: string
  loading?: boolean
}

const CostumeImg = ({ imageKey, size, alt, loading }: Props) => {
  const key = imageKey ? encodeURIComponent(`${imageKey}.${size}.png`) : undefined
  const url = loading ? Urls.blankImage : Urls.file(key)
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={alt} className={`w-full aspect-square object-cover ${loading && 'opacity-10 animate-pulse'}`} loading='lazy' />
    </div>
  )
}

export default CostumeImg
