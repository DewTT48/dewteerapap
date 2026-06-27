import ThaiText from '@/components/ThaiText'

type ResponsiveLines = {
  base: string[]
  md?: string[]
  lg?: string[]
}

type LineBreakTextProps = {
  lines: string[] | ResponsiveLines
  className?: string
  lineClassName?: string
}

const renderLines = (lines: string[], lineClassName: string) => (
  <>
    {lines.map((line) => (
      <span key={line} className={`block ${lineClassName}`}>
        <ThaiText text={line} />
      </span>
    ))}
  </>
)

export default function LineBreakText({ lines, className = '', lineClassName = '' }: LineBreakTextProps) {
  if (Array.isArray(lines)) {
    return <span className={className}>{renderLines(lines, lineClassName)}</span>
  }

  const mdLines = lines.md ?? lines.base
  const lgLines = lines.lg ?? mdLines

  return (
    <span className={className}>
      <span className="block md:hidden">{renderLines(lines.base, lineClassName)}</span>
      <span className="hidden md:block lg:hidden">{renderLines(mdLines, lineClassName)}</span>
      <span className="hidden lg:block">{renderLines(lgLines, lineClassName)}</span>
    </span>
  )
}
