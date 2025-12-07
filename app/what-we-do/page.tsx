import WhatWeDo from "../../components/WhatWeDo"
import Navbar from "../../components/Navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "What we do — ZenithCode",
  description:
    "We design and build modern web products and AI-driven automation that make businesses faster, smarter, and easier to scale. Our work blends beautiful UX, rock-solid engineering, and pragmatic automation to ship measurable outcomes."
}

export default function Page() {
  return (
    <div className="bg-black">
      <Navbar />
      <WhatWeDo />
    </div>
  )
}
