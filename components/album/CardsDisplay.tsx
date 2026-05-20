"use client";

import { Suspense, useEffect, useState } from "react";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  CompleteAlbumCardCategory,
  CompleteUserCard,
} from "@/lib/supabase/types/types";
import { Badge } from "../ui/badge";
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group";

export default function CardsDisplay({
  cards,
  userCards,
  loading,
  createItem,
  updateItem,
  deleteItem,
}: {
  cards: CompleteAlbumCardCategory[];
  userCards: CompleteUserCard[] | null;
  loading: boolean;
  createItem: (cardId: string) => void;
  updateItem: (userCardId: string, quantity: number) => void;
  deleteItem: (userCardId: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const userCardMap = new Map(
    (userCards ?? []).map((uc) => [uc.cards.name, uc]),
  );

  const handleClick = (
    action: "ADD" | "REMOVE",
    card: CompleteAlbumCardCategory,
    userCard?: CompleteUserCard,
  ) => {
    if (action == "ADD") {
      if (!userCard) {
        createItem(card.cards.id);
      } else {
        updateItem(userCard.id, userCard.quantity + 1);
      }
    }
    if (action == "REMOVE" && userCard) {
      if (userCard.quantity < 1) return;
      else if (userCard.quantity == 1) {
        deleteItem(userCard.id);
      } else {
        updateItem(userCard.id, userCard.quantity - 1);
      }
    }
  };

  return (
    <Suspense fallback={<div className="h-80 w-full">Carregando...</div>}>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="flex items-center justify-between gap-4 w-full h-fit">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 h-[stretch]"
            >
              <ChevronsUpDown />
              <span className="sr-only">Toggle details</span>
            </Button>
          </CollapsibleTrigger>

          {!isOpen && (
            <div className="grid grid-cols-4 gap-2">
              {cards.map((card) => {
                const userCard = userCardMap.get(card.cards.name);
                return (
                  <Badge
                    key={card.cards.id}
                    className={`w-full ${!userCard ? "" : userCard.quantity === 1 ? "bg-green-300" : userCard.quantity > 1 ? "bg-yellow-300" : ""}`}
                  >
                    {card.cards.name}
                  </Badge>
                );
              })}
            </div>
          )}

          {isOpen && (
            <div className="flex flex-col gap-4 w-full">
              {cards.map((card) => {
                const userCard = userCardMap.get(card.cards.name);
                return (
                  <div
                    className="flex justify-between items-center"
                    key={card.cards.id}
                  >
                    <div className="flex align-center">{card.cards.name}</div>
                    <ButtonGroup>
                      <Button
                        variant="ghost"
                        disabled={
                          !userCard || loading || userCard.quantity == 0
                        }
                        onClick={() => handleClick("REMOVE", card, userCard)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-minus"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          />
                          <path d="M5 12l14 0" />
                        </svg>
                      </Button>
                      <ButtonGroupSeparator />
                      <Button
                        disabled
                        variant="outline"
                      >
                        {userCard?.quantity ?? 0}
                      </Button>
                      <ButtonGroupSeparator />
                      <Button
                        size={"icon"}
                        variant="ghost"
                        disabled={loading}
                        onClick={() => handleClick("ADD", card, userCard)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          />
                          <path d="M12 5l0 14" />
                          <path d="M5 12l14 0" />
                        </svg>
                      </Button>
                    </ButtonGroup>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Collapsible>
    </Suspense>
  );
}
