import { Dispatch, SetStateAction, useRef } from "react";
import { FormLabel } from "../ui/form";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

type ImageItem = string | File;
export default function PCThumbnailBox({ thumbnail, setThumbnail }: { thumbnail: ImageItem; setThumbnail: Dispatch<SetStateAction<ImageItem>> }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);

            // Only accept image files
            const imageFile = files.find(file => file.type.startsWith("image/"));

            if (imageFile) {
                setThumbnail(imageFile);
            }
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const filesArray = Array.from(e.dataTransfer.files);

            // Only accept image files
            const imageFile = filesArray.find(file => file.type.startsWith("image/"));

            if (imageFile) {
                setThumbnail(imageFile);
            }
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const isFile = thumbnail instanceof File;
    const imageUrl = isFile ? URL.createObjectURL(thumbnail) : thumbnail;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <FormLabel>Project Thumbnail</FormLabel>
                <input
                required={false}
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                />
            </div>

            <div
                className="border-2 border-dashed border-border rounded-lg p-4 bg-background/30"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <div onClick={() => fileInputRef.current?.click()} className="gap-4 relative w-full aspect-[16/7]">
                    {imageUrl && <Image
                        fill
                        src={imageUrl}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                    />}

                    {!imageUrl && (
                        <div className="col-span-full h-full flex flex-col items-center justify-center text-muted-foreground border border-border rounded-lg bg-background/50 cursor-pointer">
                            <ImageIcon className="h-10 w-10 mb-2" />
                            <p className="text-sm">Drag & drop image here or click  here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}