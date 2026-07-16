"use client"

import { Typewriter } from "./animations"

export default function TestComp() {
    return (
        <div className="w-full flex flex-col p-2 bg-neutral-900/50">
            <h6 className="text-sm font-semibold code text-neutral-100 text-center opacity-40">
                <Typewriter text={'The website is still in development'} />
            </h6>
        </div>
    )
}