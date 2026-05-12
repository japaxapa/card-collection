import { AlbumForm } from "@/components/album-form";

export default function CreateAlbumPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 md:min-w-[640px] xl:min-w-[1024px]">
      <div className="w-full max-w-screen-sm md:max-w-screen-md">
        <AlbumForm />
      </div>
    </div>
  );
}
