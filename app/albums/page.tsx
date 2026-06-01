"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AlbumPage() {
  // TODO put this on a hook
  const [albums, setAlbums] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const { data, error } = await supabase.from("albums").select("*");

    if (error) {
      console.error("Error fetching albums", error.message);
    }

    setAlbums(data);
  };

  return (
    <div className={"flex flex-col gap-6"}>
      <Card className="min-h-[85vh]">
        <CardHeader>
          <CardTitle className="text-2xl">Albums</CardTitle>
          <CardDescription>Select your album</CardDescription>
        </CardHeader>
        <CardContent>
          {albums && albums.length ? (
            <div className="grid">
              {albums.map((album) => (
                <Card key={album.id}>
                  <Link href={`/albums/${album.id}`}>
                    <CardHeader>
                      {/* <CardContent>TODO Image for album</CardContent> */}
                      <CardTitle>{album.name}</CardTitle>
                      <CardDescription>{album.description}</CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div>No Albums</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
