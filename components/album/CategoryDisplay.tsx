import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CompleteAlbumCategory } from "@/lib/supabase/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CardsDisplay from "./CardsDisplay";

export default function CategoryDisplay({
  category,
}: {
  category: CompleteAlbumCategory;
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
          <CardsDisplay cards={category.card_categories} />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
