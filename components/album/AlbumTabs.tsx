import AlbumDetails from "@/components/album/AlbumDetail";
import Duplicates from "@/components/album/Duplicates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MissingCards from "./MissingCards";

// TODO check the hydration error

export default function AlbumTabs() {
  return (
    <div className="min-w-72">
      <Tabs
        defaultValue="missing"
        className="w-full"
      >
        <TabsList
          variant={"line"}
          className="w-full mb-6"
        >
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="duplicates">Duplicates</TabsTrigger>
          <TabsTrigger value="missing">Missing</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <AlbumDetails />
        </TabsContent>
        <TabsContent value="duplicates">
          <Duplicates />
        </TabsContent>
        <TabsContent value="missing">
          <MissingCards />
        </TabsContent>
      </Tabs>
    </div>
  );
}
