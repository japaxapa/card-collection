import { Database } from "./datbase";

export type Album = Database["public"]["Tables"]["albums"]["Row"];

export type Category = Database["public"]["Tables"]["categories"]["Row"];

export type CardCategories =
  Database["public"]["Tables"]["card_categories"]["Row"];

export type Card = Database["public"]["Tables"]["cards"]["Row"];

export type UserCard = Database["public"]["Tables"]["user_cards"]["Row"];

export type CompleteAlbum = Database["public"]["Tables"]["albums"]["Row"] & {
  categories: CompleteAlbumCategory[];
};

export type CompleteAlbumCategory =
  Database["public"]["Tables"]["categories"]["Row"] & {
    card_categories: CompleteAlbumCardCategory[];
  };

export type CompleteAlbumCardCategory = {
  cards: Card;
};
