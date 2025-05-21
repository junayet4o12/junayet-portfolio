import { useRef, Dispatch, SetStateAction } from 'react';
import { X, Plus, ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { FormLabel } from '../ui/form';
import Image from 'next/image';

// Type for the image items
type ImageItem = string | File;

interface ImageCardProps {
    src: ImageItem;
    index: number;
    totalImages: number;
    moveImageLeft: (index: number) => void;
    moveImageRight: (index: number) => void;
    removeImage: (index: number) => void;
}

const ImageCard = ({ src, index, totalImages, moveImageLeft, moveImageRight, removeImage }: ImageCardProps) => {

    const isFile = src instanceof File;
    const imageUrl = isFile ? URL.createObjectURL(src) : src;



    return (
        <div className="relative flex flex-col group rounded-lg border border-border bg-background/50 overflow-hidden">
            <div className="h-36 w-full flex items-center justify-center overflow-hidden bg-gray-100 relative">
                {src ? (
                    <Image fill src={imageUrl} alt="Upload preview" className="h-full w-full object-cover" />
                ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <ImageIcon className="h-10 w-10 mb-2" />
                        <span className="text-xs">No image</span>
                    </div>
                )}
            </div>
            <div className="p-2 flex justify-between items-center gap-1">
                <div className="flex-1 text-xs text-muted-foreground truncate">
                    {isFile ? src.name : src ? src : 'Empty'}
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => moveImageLeft(index)}
                        disabled={index === 0}
                        className="h-8 w-8 rounded-full"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => moveImageRight(index)}
                        disabled={index === totalImages - 1}
                        className="h-8 w-8 rounded-full"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeImage(index)}
                        className="h-8 w-8 rounded-full"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

const PCImageBox = ({ images, setImages }: { images: ImageItem[]; setImages: Dispatch<SetStateAction<ImageItem[]>> }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);

            // Filter only image files
            const imageFiles = files.filter(file => file.type.startsWith("image/"));

            setImages(prev => [...prev, ...imageFiles]);
        }
    };


    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const moveImageLeft = (index: number) => {
        if (index === 0) return; // Can't move left if already first

        setImages(prevImages => {
            const newImages = [...prevImages];
            const temp = newImages[index];
            newImages[index] = newImages[index - 1];
            newImages[index - 1] = temp;
            return newImages;
        });
    };

    const moveImageRight = (index: number) => {
        if (index === images.length - 1) return; // Can't move right if already last

        setImages(prevImages => {
            const newImages = [...prevImages];
            const temp = newImages[index];
            newImages[index] = newImages[index + 1];
            newImages[index + 1] = temp;
            return newImages;
        });
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const filesArray = Array.from(e.dataTransfer.files);

            // Filter only image files
            const imageFiles = filesArray.filter(file => file.type.startsWith("image/"));

            setImages(prev => [...prev, ...imageFiles]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <FormLabel>Project Images</FormLabel>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-8 px-2 rounded-lg"
                    >
                        <Plus className="h-4 w-4 mr-1" /> Upload Image
                    </Button>
                </div>
                <input
                    required={false}
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                />
            </div>

            <div
                className="border-2 border-dashed border-border rounded-lg p-4 bg-background/30"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <ImageCard
                            key={`image-${index}`}
                            src={image}
                            index={index}
                            totalImages={images.length}
                            moveImageLeft={moveImageLeft}
                            moveImageRight={moveImageRight}
                            removeImage={removeImage}
                        />
                    ))}

                    {images.length === 0 && (
                        <div onClick={() => fileInputRef.current?.click()} className="col-span-full h-36 flex flex-col items-center justify-center text-muted-foreground border border-border rounded-lg bg-background/50 cursor-pointer">
                            <ImageIcon className="h-10 w-10 mb-2" />
                            <p className="text-sm">Drag & drop images here or use the upload buttons</p>
                        </div>
                    )}
                </div>
            </div>

            {images.length > 0 && (
                <p className="text-sm text-muted-foreground">Use arrow buttons to change image position</p>
            )}
        </div>
    );
};

export default PCImageBox;