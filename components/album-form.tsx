"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AlbumForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();
  const { albumId } = useParams();

  useEffect(() => {
    if (albumId) fetchAlbum();
  }, []);

  const fetchAlbum = async () => {
    if (albumId && typeof albumId == "string") {
      const { data, error } = await supabase
        .from("albums")
        .select("*")
        .eq("id", albumId);

      if (error) throw error;
      if (!data) {
        setError("Error fetching album data");
      }

      setName(data[0].name);
      setDescription(data[0].description ?? "");
      setImageUrl(data[0].cover_img_url ?? "");
    }
  };

  const handleCreateAlbum = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("albums").insert({
        name: name,
        description: description,
        cover_img_url: imageUrl,
      });
      if (error) throw error;
      router.push("/albums");
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while creating an album",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Album</CardTitle>
          <CardDescription>Create a new album</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateAlbum}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="my album"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="description">Description</Label>
                </div>
                <Input
                  id="description"
                  type="text"
                  placeholder="This album is a special edition"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="image-url">Image URL</Label>
                </div>
                <Input
                  id="image-url"
                  type="url"
                  placeholder="https://www.albumimage.com/my-album.jpeg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating an album..." : "Create"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
