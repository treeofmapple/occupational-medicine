"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("@/app/App"), { ssr: false });

export default function CatchAllPage() {
  return <App />;
}
