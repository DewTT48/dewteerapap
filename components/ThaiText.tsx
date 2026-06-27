const defaultProtectedTerms = [
  'HR x AI',
  'Human in the Loop',
  'HR Transformation',
  'HR Workflow',
  'workflow',
  'AI Adoption',
  'AI Workflow',
  'AI Assistant',
  'AI Agent',
  'AI for HR',
  'Generative AI',
  'Prompt Engineering',
  'Prompt Design',
  'Workflow Design',
  'People Development',
  'Performance Management',
  'Workforce Planning',
  'Career Development',
  'Functional Competency',
  'Organization Development',
  'Case Studies'
]

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

type ThaiTextProps = {
  text: string
  keepTogether?: string[]
  className?: string
}

export default function ThaiText({ text, keepTogether = [], className = '' }: ThaiTextProps) {
  const protectedTerms = [...defaultProtectedTerms, ...keepTogether]
    .filter((term, index, terms) => term && terms.indexOf(term) === index)
    .sort((a, b) => b.length - a.length)
  const protectedPattern = protectedTerms.length
    ? new RegExp(`(${protectedTerms.map(escapeRegExp).join('|')})`, 'g')
    : null
  const parts = protectedPattern ? text.split(protectedPattern) : [text]

  return (
    <span className={`thai-text ${className}`}>
      {parts.map((part, partIndex) => {
        if (!part) return null
        if (protectedTerms.includes(part)) {
          return (
            <span key={`${part}-${partIndex}`} className="whitespace-nowrap">
              {part}
            </span>
          )
        }
        return part
      })}
    </span>
  )
}
