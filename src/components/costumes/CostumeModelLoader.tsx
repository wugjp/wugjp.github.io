import { getCostume, getCostumeModel } from '@/actions/costume'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import GLBModelViewer from './GLBModelViewer'

type Props = {
  modelId?: number
}

const CostumeModelLoader = async ({ modelId }: Props) => {
  if (!modelId) {
    notFound()
  }
  const model = await getCostumeModel(modelId)
  if (!model) {
    notFound()
  }
  if (!model.url.endsWith('.glb')) {
    redirect(model.url)
  }
  const costume = await getCostume(model.costumeId)
  if (!costume) {
    notFound()
  }
  return (
    <div className='flex flex-col gap-2 items-center'>
      <div className='w-full max-w-md px-2 py-8 md:px-0 text-xs text-gray-500'>
        <div className='flex gap-1'>
          <Link href={`/costumes/${costume.id}`} className='text-blue-500'>
            {costume.name}
          </Link>
        </div>
        {model.description && <div>{model.description}</div>}
        <div className='flex gap-1'>
          <span>モデルデータ提供:</span>
          <Link href={model.creditUrl} target='_blank' className='text-blue-500'>
            {model.creditName}
          </Link>
          {model.creditName !== '草ブレード' && <span>さん</span>}
        </div>
      </div>
      {model.url.endsWith('.glb') && <GLBModelViewer modelUrl={model.url} />}
    </div>
  )
}

export default CostumeModelLoader
