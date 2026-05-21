"use client";

import useUserCards from "@/hooks/useUserCards";
import { DuplicateUserCard } from "@/lib/supabase/types/types";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Papa from "papaparse";

export default function Duplicates() {
  const [duplicates, setDuplicates] = useState<DuplicateUserCard[]>();

  const { loading, fetchDuplicates, fetchDuplicatesCSV } = useUserCards();

  async function fetchDup() {
    const dup = await fetchDuplicates();
    setDuplicates(dup);
  }

  async function handleDownload() {
    const csv = await fetchDuplicatesCSV();
    if (csv) {
      const parsedCSV = Papa.parse(csv);
      const data = [...parsedCSV.data].map((row, index) => {
        if (index == 0) return row;

        const parsed = JSON.parse(row[1]);

        return [row[0], parsed.name];
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

  useEffect(() => {
    fetchDup();
  }, []);

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
              <CardTitle>Duplicates</CardTitle>
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
              <div>
                {duplicates?.map((duplicate) => (
                  <div
                    key={duplicate.id}
                    className="flex w-full justify-between"
                  >
                    <div>{duplicate.cards.name}</div>
                    <div>x {duplicate.quantity}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
