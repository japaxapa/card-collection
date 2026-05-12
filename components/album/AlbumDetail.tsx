"use client";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AlbumDetails() {
  const [album, setAlbum] = useState<any | null>(null);

  const { albumId } = useParams();
  const supabase = createClient();

  const fetchAlbum = async () => {
    const { data, error } = await supabase
      .from("albums")
      .select("*")
      .eq("id", albumId);

    if (error) console.error("Error while reading album", error.message);

    if (data) setAlbum(data[0]);
  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  return (
    <div className={"flex flex-col gap-6"}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{album?.name}</CardTitle>
          <CardDescription>{album?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Card>
            <CardHeader>
              <CardTitle>Cards</CardTitle>
              <CardDescription>
                Album's cards sorted by categories
              </CardDescription>
              <CardContent>TODO Image for album</CardContent>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
