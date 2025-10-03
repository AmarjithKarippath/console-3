import { notFound } from "next/navigation"

export default function CatchAllPage() {
  // This will trigger the not-found.tsx page for any unmatched route
  notFound()
}
