export const metadata = {
  title: 'Sanity Studio',
  description: 'Sanity Studio',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      {children}
    </div>
  )
}
