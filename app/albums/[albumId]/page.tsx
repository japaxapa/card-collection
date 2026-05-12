import AlbumDetails from "@/components/album/AlbumDetail";
import { Suspense } from "react";

export default function AlbumPage() {
  return (
    <div>
      <Suspense fallback={<div>Carregando album</div>}>
        <AlbumDetails />
      </Suspense>
    </div>
  );
}
