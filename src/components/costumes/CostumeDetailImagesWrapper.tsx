import { listCostumeImages, listCostumeModels } from '@/actions/costume'
import { Costume } from '@prisma/client'
import CostumeDetailImages from './CostumeDetailImages'

interface Props {
  costume?: Costume
}

const CostumeDetailImagesWrapper = async ({ costume }: Props) => {
  const images = costume ? await listCostumeImages(costume.id) : []
  const models = costume ? await listCostumeModels(costume.id) : []
  return costume ? <CostumeDetailImages images={images} models={models} /> : <CostumeDetailImages />
}

export default CostumeDetailImagesWrapper
