"use client";
import { useState } from "react";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import { CompleteAlbumCardCategory } from "@/lib/supabase/types/types";
import { Badge } from "../ui/badge";

export default function CardsDisplay({
  cards,
}: {
  cards: CompleteAlbumCardCategory[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(cards);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex items-center justify-between gap-4 w-full">
        <div className="grid grid-cols-4 gap-2">
          {cards.map((card) => (
            <Badge key={card.cards.id} className={`w-full bg-green-400`}  >{card.cards.name}</Badge>
          ))}
        </div>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
          >
            <ChevronsUpDown />
            <span className="sr-only">Toggle details</span>
          </Button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  );
}
