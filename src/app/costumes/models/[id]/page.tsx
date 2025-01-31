import { getCostume, getCostumeModel, listCostumeModels } from '@/actions/costume'
import Container from '@/components/common/Container'
import CostumeModelLoader from '@/components/costumes/CostumeModelLoader'
import { currentBaseUrl } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata | null> => {
  const p = await params
  const id = parseInt(p.id)
  if (isNaN(id) || id < 1) {
    return null
  }
  const model = await getCostumeModel(id)
  if (!model) {
    return null
  } else {
    const costume = await getCostume(model.costumeId)
    if (!costume) {
      return null
    }
    const { costumes: t } = await getDictionary()
    const title = `${costume.name} - ${t.title}`
    const description = t.description
    return {
      title,
      description,
      openGraph: {
        title,
        description,
      },
      twitter: {
        title,
        creator: '@kusabure',
        images: [`${currentBaseUrl}/300x300.png`],
        card: 'summary',
      },
    }
  }
}

export const generateStaticParams = async () => {
  const costumes = await listCostumeModels()
  return costumes.map((model) => ({ id: model.id.toString() }))
}

const Model = async ({ params }: Props) => {
  const p = await params
  const id = parseInt(p.id)
  if (isNaN(id) || id < 1) {
    return null
  }
  return (
    <Container>
      <div className='w-[100vw] h-[100vh]'>
        <CostumeModelLoader modelId={id} />
      </div>
    </Container>
  )
}

export default Model
