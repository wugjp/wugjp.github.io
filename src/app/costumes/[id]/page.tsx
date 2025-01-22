import { getCostume, listCostumes } from '@/actions/costume'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import getMetadata from '@/components/common/Meta'
import CostumeDetailImagesWrapper from '@/components/costumes/CostumeDetailImagesWrapper'
import CostumeMetadata from '@/components/costumes/CostumeMetadata'
import CostumeTweets from '@/components/costumes/CostumeTweets'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Urls } from '@/lib/urls'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata | null> => {
  const p = await params
  const id = parseInt(p.id)
  if (isNaN(id) || id < 1) {
    return null
  }
  const costume = await getCostume(id)
  if (!costume) {
    return null
  } else {
    const { costumes: t } = await getDictionary()
    const title = `${isDefaultLocale ? costume.name : costume.nameEn} - ${t.title}`
    const description = t.description
    const imageKey = costume.images[0]?.imageKey
    const key = imageKey ? encodeURIComponent(`costumes/${imageKey}.s.png`) : undefined
    const thumbnailUrl = Urls.file(key)
    const meta = await getMetadata(title, description, thumbnailUrl)
    return meta
  }
}

export const generateStaticParams = async () => {
  const costumes = await listCostumes()
  return costumes.map((costume) => ({ id: costume.id.toString() }))
}

const Costume = async ({ params }: Props) => {
  const p = await params
  const id = parseInt(p.id)
  if (isNaN(id) || id < 1) {
    notFound()
  }
  const costume = await getCostume(id)
  if (!costume) {
    notFound()
  }
  const { costumes: t } = await getDictionary()
  return (
    <Container className='max-w-screen-lg text-center px-2 md:px-2 py-4'>
      <Breadcrumbs items={[{ name: t.title, href: '/costumes' }]} />
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-8'>
          <div className='xs:block md:hidden'>
            <CostumeMetadata costume={costume} />
          </div>
          <div>
            <CostumeDetailImagesWrapper costume={costume} />
          </div>
          <div className='hidden md:block'>
            <CostumeMetadata costume={costume} />
          </div>
        </div>
        <CostumeTweets costumeId={id} />
      </div>
    </Container>
  )
}

export default Costume
