'use client'

import { useDictionary } from '@/i18n/hook'
import { Urls } from '@/lib/urls'
import { CostumeImage } from '@prisma/client'
import Link from 'next/link'
import { useState } from 'react'
import CostumeImg from './CostumeImg'

interface Props {
  images?: CostumeImage[]
}

const CostumeDetailImages = ({ images }: Props) => {
  const [image, setImage] = useState(images && images.length > 0 ? images[0] : undefined)
  const { costumes: t } = useDictionary()
  return (
    <>
      <div className='border rounded'>
        {image ? (
          <Link href={Urls.file(encodeURIComponent(`${image.imageKey}.1024.png`))} target='_blank' className='text-primary'>
            <CostumeImg imageKey={image?.imageKey} size='600' alt={image?.description || 'no image'} loading={!images} />
          </Link>
        ) : (
          <CostumeImg imageKey={undefined} size='600' alt={'no image'} loading={!images} />
        )}
      </div>
      {image && (
        <>
          <div className='grid gap-1 py-2 text-left text-xs text-gray-500'>
            <div className='min-h-8'>
              <span className='mr-1'>{image.description}</span>
              <span className='mr-1'>（{t.photoBy}</span>
              <Link href={image.creditUrl} target='_blank' className='text-primary'>
                {image.creditName}
              </Link>
              <span>{image.creditName === '草ブレード' ? '' : ` ${t.san}`}）</span>
            </div>
          </div>
          <div className='pt-4 text-left whitespace-nowrap overflow-x-scroll'>
            {images &&
              images.length > 1 &&
              images.map((img) => (
                <div key={img.id} className='w-20 h-20 inline-block mr-2 border rounded cursor-pointer select-none' onClick={() => setImage(img)}>
                  <CostumeImg imageKey={img.imageKey} size='240' alt={img.description} />
                </div>
              ))}
          </div>
        </>
      )}
    </>
  )
}

export default CostumeDetailImages
