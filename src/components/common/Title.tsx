interface Props {
  title?: string
  description?: string
}

const Title = ({ title, description }: Props) =>
  title || description ? (
    <div className='py-4 text-center'>
      {title && <h2 className='text-lg font-bold text-secondary'>{title}</h2>}
      {description && <div className='text-xs text-gray-500'>{description}</div>}
    </div>
  ) : (
    <></>
  )

export default Title
