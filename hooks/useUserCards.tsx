"use client";

import { createClient } from "@/lib/supabase/client";
import { CompleteUserCard } from "@/lib/supabase/types/types";
import { User } from "@supabase/supabase-js";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function useUserCards() {
  const [userAlbumCards, setUserAlbumCards] = useState<
    CompleteUserCard[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currUser, setCurrUser] = useState<User>();

  const { albumId } = useParams();
  const supabase = useMemo(() => createClient(), []);

  async function getLoggedInUser(): Promise<User> {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error.message);
      throw new Error("Failed to fetch user info");
    }

    if (user) {
      setCurrUser(user);
      return user;
    } else {
      throw new Error("Failed to fetch user info");
    }
  }

  const fetchUserCards = async () => {
    if (!albumId || typeof albumId !== "string") {
      setLoading(false);
      return;
    }

    setLoading(true);
    const currentUser = currUser ?? (await getLoggedInUser());
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_cards")
        .select(
          `
            *,
            cards (*)
          `,
        )
        .eq("album_id", albumId as string)
        .eq("user_id", currentUser.id);

      if (error) throw error;
      setUserAlbumCards(data ?? null);
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error(
              "An error occurred while fetching user cards from an album",
            ),
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchDuplicates = async () => {
    if (!albumId || typeof albumId !== "string") {
      setLoading(false);
      return;
    }

    setLoading(true);
    const currentUser = currUser ?? (await getLoggedInUser());
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_cards")
        .select(
          `
            id,
            cards(name),
            quantity
          `,
        )
        .eq("album_id", albumId as string)
        .eq("user_id", currentUser.id)
        .gt("quantity", 1)
        .order("cards(name)", { ascending: true });

      if (error) throw error;

      return data;
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error(
              "An error occurred while fetching duplicate cards from an album",
            ),
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchDuplicatesCSV = async () => {
    if (!albumId || typeof albumId !== "string") {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_cards")
        .select(
          `
            cards(name),
            quantity
          `,
        )
        .eq("album_id", albumId as string)
        .gt("quantity", 1)
        .order("cards(name)", { ascending: true })
        .csv();

      if (error) throw error;

      return data;
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error(
              "An error occurred while fetching duplicate cards from an album in csv",
            ),
      );
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (cardId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("user_cards")
        .insert([
          {
            user_id: currUser?.id,
            album_id: albumId as string,
            card_id: cardId,
          },
        ])
        .select();

      if (error) throw error;

      await fetchUserCards();
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error(
              "An error occurred while creating user cards into an album",
            ),
      );
      setLoading(false);
    }
  };

  const updateItem = async (userCardId: string, quantity: number) => {
    setLoading(true);

    try {
      const { error } = await supabase
        .from("user_cards")
        .update({ quantity: quantity })
        .eq("id", userCardId)
        .select();

      if (error) throw error;

      await fetchUserCards();
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error(
              "An error occurred while updating the quantity on user card",
            ),
      );
      setLoading(false);
    }
  };

  const deleteItem = async (userCardId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("user_cards")
        .delete()
        .eq("id", userCardId);

      if (error) throw error;

      await fetchUserCards();
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error(
              "An error occurred while deleting a user card from an album",
            ),
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (albumId && currUser) {
      fetchUserCards();
    }
  }, [albumId, currUser, supabase]);

  useEffect(() => {
    getLoggedInUser();
  }, [supabase]);

  return {
    user: currUser,
    userAlbumCards,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    fetchDuplicates,
    fetchDuplicatesCSV,
    fetchUserCards,
  };
}
