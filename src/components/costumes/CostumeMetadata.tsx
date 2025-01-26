import { getDictionary } from '@/i18n/dictionaries'
import { Costume } from '@prisma/client'

interface Props {
  costume: Costume
}

const CostumeMetadata = async ({ costume }: Props) => {
  const { name, nameEn, isOfficialName, note } = costume
  const { costumes: t } = await getDictionary()
  return (
    <div className='text-left grid gap-1 [&_]:text-xs [&_]:text-gray-500'>
      <div>
        <span className='pr-1'>{t.costumeNameType}:</span>
        <span>{isOfficialName ? t.official : t.unofficial}</span>
      </div>
      <div>{nameEn}</div>
      <h2 className='font-bold text-lg text-primary'>{name}</h2>
      <pre>{note}</pre>
    </div>
  )
}

export default CostumeMetadata
