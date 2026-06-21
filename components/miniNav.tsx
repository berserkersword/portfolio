// MiniNavbar.tsx
'use client'

type Tab =  'photo' | 'video'

export default function MiniNavbar({
  activeTab,
  setActiveTab
}: {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}) {
  const tabs: Tab[] = ['video', 'photo']

  return (
    <nav className="flex justify-center items-center py-6 backdrop-blur-sm">
      <ul className="flex gap-10 list-none m-0 p-0">
        {tabs.map(tab => (
          <li key={tab}>
            <button
              onClick={() => setActiveTab(tab)}
              className={`
                text-[13px] tracking-widest uppercase transition-colors duration-200
                ${activeTab === tab
                  ? 'text-white font-medium'
                  : 'text-white/50 font-normal hover:text-white/90'}
              `}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}