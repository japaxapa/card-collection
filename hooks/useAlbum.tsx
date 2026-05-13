"use client";

import { createClient } from "@/lib/supabase/client";
import { CompleteAlbum } from "@/lib/supabase/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAlbum() {
  const [album, setAlbum] = useState<CompleteAlbum | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { albumId } = useParams();
  const supabase = createClient();

  useEffect(() => {
    fetchAlbum();
  }, [albumId]);

  const fetchAlbum = async () => {
    setLoading(true);
    try {
      if (!albumId || typeof albumId !== "string") return;
      const completeAlbumQuery = supabase
        .from("albums")
        .select(
          `
      *,
      categories (
        *,
        card_categories (
          cards (*)
        )
      )
    `,
        )
        .eq("id", albumId)
        .single();

      const { data, error } = await completeAlbumQuery;

      if (error) throw error;

      if (data) setAlbum(data);
    } catch (error) {
      console.error(
        "Error while reading album",
        error instanceof Error
          ? error.message
          : "An error occurred while fetching album data",
      );
      setError(
        error instanceof Error
          ? error
          : new Error("An error occurred while fetching album data"),
      );
    } finally {
      setLoading(false);
    }
  };

  return { album, loading, error };
}
