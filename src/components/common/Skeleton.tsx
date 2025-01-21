type Props = {
  lines?: number
  className?: string
}

const Skelton = ({ lines = 1, className }: Props) => {
  return (
    <div className={`w-full ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="bg-gray-200 animate-pulse h-4 w-full rounded-md my-1" />
      ))}
    </div>
  )
}

export default Skelton
