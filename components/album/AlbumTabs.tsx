import AlbumDetails from "@/components/album/AlbumDetail";
import Duplicates from "@/components/album/Duplicates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MissingCards from "./MissingCards";

// TODO check the hydration error

export default function AlbumTabs() {
  return (
    <Tabs defaultValue="missing">
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
        {/* <div></div> */}
      </TabsContent>
      <TabsContent value="duplicates">
        <Duplicates />
        {/* <div></div> */}
      </TabsContent>
      <TabsContent value="missing">
        <MissingCards />
        {/* <div></div> */}
      </TabsContent>
    </Tabs>
  );
}
