import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CompleteAlbumCategory,
  CompleteUserCard,
} from "@/lib/supabase/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CardsDisplay from "./CardsDisplay";

export default function CategoryDisplay({
  category,
  userCards,
  loading,
  createItem,
  updateItem,
  deleteItem,
}: {
  category: CompleteAlbumCategory;
  userCards: CompleteUserCard[] | null;
  loading: boolean;
  createItem: (cardId: string) => void;
  updateItem: (userCardId: string, quantity: number) => void;
  deleteItem: (userCardId: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center">
            <div>{category.title}</div>
            <Avatar>
              <AvatarImage
                src={`/${category.title.toLowerCase()}.png`}
                alt={`${category.title} flag`}
              />
              <AvatarFallback>{category.title}</AvatarFallback>
            </Avatar>
          </div>
        </CardTitle>
        <CardContent className="px-0 mt-2">
          <CardsDisplay
            cards={category.card_categories}
            userCards={userCards}
            loading={loading}
            createItem={createItem}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
