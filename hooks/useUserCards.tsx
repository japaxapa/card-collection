"use client";

import { createClient } from "@/lib/supabase/client";
import { CompleteUserCard } from "@/lib/supabase/types/types";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function useUserCards() {
  const [userAlbumCards, setUserAlbumCards] = useState<CompleteUserCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { albumId } = useParams();
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    if (!albumId || userAlbumCards || typeof albumId !== "string") {
      setLoading(false);
      return;
    }

    const fetchAlbum = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("user_cards")
          .select(`
            *,
            cards (*)
          `)
          .eq("album_id", albumId);

        if (error) throw error;
        setUserAlbumCards(data ?? null);
      } catch (error) {
        setError(
          error instanceof Error
            ? error
            : new Error("An error occurred while fetching user cards from an album"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [albumId, supabase]);

  return { userAlbumCards, loading, error };
}
