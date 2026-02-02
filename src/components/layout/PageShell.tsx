type Props = {
  children: React.ReactNode
}

export default function PageShell({ children }: Props) {
  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-10 text-neutral-100">
      <div className="mx-auto w-full max-w-2xl">{children}</div>
    </main>
  )
}