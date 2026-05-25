"use client";

import { createClient } from "@/lib/supabase/client";
import { Card } from "@/lib/supabase/types/types";
import { User } from "@supabase/supabase-js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useMissingCards() {
  const [missingCards, setMissingCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const { albumId } = useParams();
  const supabase = createClient();

  async function getLoggedInUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error.message);
      return null;
    }

    setUser(user);
  }

  useEffect(() => {
    if (user && albumId) fetchMissing();
  }, [albumId, user]);

  const fetchMissing = async () => {
    setLoading(true);
    try {
      if (!albumId || typeof albumId !== "string") return;

      const { data, error } = await supabase.rpc("get_missing_cards", {
        p_album_id: albumId,
        p_user_id: user ? user.id : "",
      });

      if (error) throw error;

      if (data) setMissingCards(data);
    } catch (error) {
      console.error(
        "Error while getting missing cards",
        error instanceof Error
          ? error.message
          : "An error occurred while fetching missing cards",
      );
      setError(
        error instanceof Error
          ? error
          : new Error("An error occurred while fetching missing cards"),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, [supabase]);

  return { missingCards, loading, error };
}
