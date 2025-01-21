import { listCostumes } from '@/actions/costume'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import getMetadata from '@/components/common/Meta'
import Title from '@/components/common/Title'
import CostumeCollection from '@/components/costumes/CostumeCollection'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const { costumes: t } = await getDictionary()
  const title = t.title
  const description = t.description
  const meta = await getMetadata(title, description)
  return meta
}

const Costumes = async () => {
  const costumes = await listCostumes()
  const { costumes: t } = await getDictionary()
  return (
    <Container className='max-w-screen-lg text-center px-2 md:px-2 py-4'>
      <Breadcrumbs items={[{ name: t.title, href: '/costumes' }]} />
      <Title title={t.title} description={t.description} />
      <div className='grid gap-16'>
        <CostumeCollection costumes={costumes} />
      </div>
    </Container>
  )
}

export default Costumes
