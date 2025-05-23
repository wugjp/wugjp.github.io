import { listCostumes } from '@/actions/costume'
import CostumeItem from './CostumeItem'

interface Props {
  costumes: Awaited<ReturnType<typeof listCostumes>>
}

const CostumeCollection = ({ costumes }: Props) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2'>
      {costumes.map((costume) => (
        <CostumeItem key={costume.id} costume={costume} />
      ))}
    </div>
  )
}

export default CostumeCollection
