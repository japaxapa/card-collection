"use client";

import useAlbum from "@/hooks/useAlbum";
import CategoryDisplay from "./CategoryDisplay";
import { useEffect, useRef, useState } from "react";
import { CompleteAlbumCategory } from "@/lib/supabase/types/types";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Search } from "lucide-react";
import useUserCards from "@/hooks/useUserCards";

export default function AlbumDetails() {
  const { album, loading, error } = useAlbum();
  const {
    userAlbumCards,
    loading: cardsLoading,
    error: cardsError,
  } = useUserCards();
  const [categories, setCategories] = useState<CompleteAlbumCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchTerm(value);

    if (value === "" && album?.categories) {
      setCategories(album.categories);
      return;
    }

    clearTimeout(timeoutRef.current || undefined);
    timeoutRef.current = setTimeout(() => {
      const newList = album?.categories.filter((category) =>
        category.title.toLowerCase().includes(value.toLowerCase()),
      );

      setCategories(newList ? newList : []);
    }, 500);
  };

  useEffect(() => {
    if (album) {
      setCategories(album?.categories);
    }
  }, [album]);

  return (
    <>
      {loading ? (
        <div>Carregando ...</div>
      ) : (
        <div className={"flex flex-col gap-6"}>
          <div id="header">
            <div className="leading-none font-semibold text-2xl">
              {album?.name}
            </div>
            <div className="text-sm text-muted-foreground">
              {album?.description}
            </div>
          </div>

          <div id="title">
            <div className="mb-4">
              <h1 className="leading-none font-semibold">Cards</h1>
              <p className="text-sm text-muted-foreground">
                Album's cards sorted by categories
              </p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <InputGroup>
                <InputGroupInput
                  placeholder="Search..."
                  onChange={handleSearchChange}
                  value={searchTerm}
                />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="flex gap-4 flex-col">
              {categories.map((category) => (
                <CategoryDisplay
                  category={category}
                  userCards={userAlbumCards}
                  key={category.title}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
