import { isValidElement, type ReactNode } from "react"

function languageOf(children: ReactNode): string | undefined {
  if (!isValidElement<{ className?: string }>(children)) return undefined
  return /language-(\w+)/.exec(children.props.className ?? "")?.[1]
}

function CodeBlock({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) {
  const language = languageOf(children)

  return (
    <div className="not-prose my-4 overflow-hidden rounded-md border border-line">
      {language && (
        <div className="border-b border-line bg-paper-subtle px-3 py-1 text-xs text-ink-muted">
          {language}
        </div>
      )}
      <pre {...props} className="m-0 overflow-x-auto bg-paper-subtle p-3 text-sm">
        {children}
      </pre>
    </div>
  )
}

export default CodeBlock
