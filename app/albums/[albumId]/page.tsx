import AlbumTabs from "@/components/album/AlbumTabs";
import { Suspense } from "react";

// TODO check performance
export default function AlbumPage() {
  return (
    <Suspense fallback={<div>Carregando album...</div>}>
      <AlbumTabs />
    </Suspense>
  );
}
