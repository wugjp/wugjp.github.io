import { CacheTag } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { Costume } from '@prisma/client'
import { unstable_cache } from 'next/cache'
import CostumeDetailImages from './CostumeDetailImages'

interface Props {
  costume?: Costume
}

const CostumeDetailImagesWrapper = async ({ costume }: Props) => {
  const images = costume ? await listCostumeImages(costume.id) : []
  return costume ? <CostumeDetailImages images={images} /> : <CostumeDetailImages />
}

const listCostumeImages = unstable_cache(
  async (id: number) =>
    await prisma.costumeImage.findMany({
      where: {
        costumeId: id,
      },
      orderBy: {
        displayOrder: 'asc',
      },
    }),
  undefined,
  { tags: [CacheTag('Costumes')] }
)

export default CostumeDetailImagesWrapper
