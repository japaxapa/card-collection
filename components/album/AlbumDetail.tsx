"use client";

import useAlbum from "@/hooks/useAlbum";
import CategoryDisplay from "./CategoryDisplay";

export default function AlbumDetails() {
  const { album, loading, error } = useAlbum();

  return (
    <div className={"flex flex-col gap-6"}>
      <div>
        <div>
          <div className="leading-none font-semibold text-2xl">
            {album?.name}
          </div>
          <div className="text-sm text-muted-foreground">
            {album?.description}
          </div>
        </div>
        <div>
          <div className="mb-4">
            <h1 className="leading-none font-semibold">Cards</h1>
            <p className="text-sm text-muted-foreground">
              Album's cards sorted by categories
            </p>
          </div>
          <div className="flex gap-4 flex-col">
            {album?.categories.map((category) => (
              <CategoryDisplay
                category={category}
                key={category.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
