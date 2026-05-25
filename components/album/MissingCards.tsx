"use client";

import useMissingCards from "@/hooks/useMissingCards";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Papa from "papaparse";
import { Badge } from "../ui/badge";

export default function MissingCards() {
  const { missingCards, loading, error } = useMissingCards();

  async function handleDownload() {
    if (missingCards) {
      const data = [...missingCards].map((card, index) => {
        if (index == 0) return ["card"];

        return [card.name];
      });

      const newCSV = Papa.unparse(data);

      // Create a blob from the CSV data
      const blob = new Blob([newCSV], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      // Create a temporary link and trigger the download
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "exported_data.csv");
      document.body.appendChild(link);

      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }
  return (
    <>
      {loading ? (
        <Card className="flex w-full">
          <div className="text-center">Carregando ...</div>
        </Card>
      ) : (
        <div className={"flex flex-col"}>
          <Card>
            <CardHeader>
              <CardTitle>Missing</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div>
                <Button
                  variant={"ghost"}
                  className="w-full"
                  onClick={handleDownload}
                >
                  Export CSV
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {missingCards?.map((missingCard) => (
                  <Badge
                    key={missingCard.id}
                    className="flex w-full justify-center aling-center"
                  >
                    <div className="text-bold">{missingCard.name}</div>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
