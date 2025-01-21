import { listCostumes } from '@/actions/costume'
import { isDefaultLocale } from '@/i18n/config'
import { Urls } from '@/lib/urls'
import Link from 'next/link'

interface Props {
  costume: Awaited<ReturnType<typeof listCostumes>>[number]
}

const CostumeItem = async ({ costume }: Props) => {
  const key = costume.images[0]?.imageKey
  const imgUrl = key ? Urls.file(`${key}.240.png`) : Urls.noImage
  return (
    <Link href={`/costumes/${costume.id}`} prefetch={false} className='border hover:bg-gray-100 [&_div]:overflow-hidden [&_div]:text-ellipsis [&_div]:text-nowrap [&_div]:text-left rounded'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgUrl} alt={costume.name} className={`w-full aspect-square object-cover`} loading='lazy' />
      <div className='p-2'>
        <div className='text-sm font-semibold'>{isDefaultLocale ? costume.name : costume.nameEn}</div>
      </div>
    </Link>
  )
}

export default CostumeItem
