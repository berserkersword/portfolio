// WorksPage.tsx
"use client"
import MiniNavbar from '@/components/miniNav'
import { useState } from "react"
import VideoPage from './video/page'
import PhotoPage from './photo/page'

export default function WorksPage() {
  const [activeTab, setActiveTab] = useState<'video' | 'photo'>('photo')

  return (
    <div className="w-full  flex flex-col p-10">
      <MiniNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab === 'video' ? <VideoPage/> : <PhotoPage/>}
      </div>
    </div>
  )
}