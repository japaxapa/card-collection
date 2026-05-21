import AlbumDetails from "@/components/album/AlbumDetail";
import Duplicates from "@/components/album/Duplicates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// TODO check the hydration error

export default function AlbumTabs() {
  return (
    <Tabs defaultValue="details">
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
        <div></div>
      </TabsContent>
    </Tabs>
  );
}
