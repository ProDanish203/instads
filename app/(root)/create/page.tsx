"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import useMount from "@/hooks/useMount";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";


const CreatePage = () => {

  const pathname = usePathname();
  const isCreatePage = pathname === "/create"
  const router = useRouter();
  const mount = useMount();

  const [fileUrl, setFileUrl] = useState("")
  const [uploaded, setUploaded] = useState(false)
  const [caption, setCaption] = useState("")

  const handleSubmit = async () => {
    if(!fileUrl) return toast.error("Media is required");

  }

  if(!mount) return null;
  return (
    <>
    <Dialog 
    open={isCreatePage}
    onOpenChange={(open) => !open && router.back()}
    >
      
      <DialogContent className="rounded-md">
        <DialogHeader className="text-left">
          <DialogTitle className="max-sm:!text-md">Create New Post</DialogTitle>
          <DialogDescription>
            {uploaded ? (
              <>
              <Suspense fallback="loading...">
                  <Image src={fileUrl} alt="image" width={400} height={400}
                  className="rounded-md w-full h-[400px] my-3 object-cover"
                  />
              </Suspense>
              <p className="mb-2 max-sm:text-left">Caption</p>
              <Input type="text" placeholder="write a caption" value={caption} onChange={(e) => setCaption(e.target.value)} autoComplete="off" name="caption" id="caption-inp"
              className="!outline-none text-sm w-full dark:text-neutral-200 text-neutral-900 dark:!bg-neutral-900"
              />
              </>
            ): (
            <>
              <UploadButton
                className="!outline-none w-32 h-32 rounded-md border-2 border-dotted border-neutral-500 flex justify-center items-center my-2 z-50 mx-auto hover:bg-neutral-300 dark:hover:bg-neutral-800 transition-all cursor-pointer"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setFileUrl(res[0].url);
                  setUploaded(true);
                  toast.success("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  toast.error(error.message);
                }}
              />

              <p className="dark:text-neutral-400 text-neutral-700 text-sm">Upload a picture to post</p>
            </>
            )}
            

            <Button onClick={handleSubmit} variant={"destructive"} disabled={!uploaded} size={"sm"} className="bg-sky-600 hover:bg-sky-700 text-md mt-3 max-sm:mx-0">Create Post</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    </>
  )
}

export default CreatePage;