import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ImageGalleryProps {
    images: string[];
  }

const ImageGallery: React.FC<ImageGalleryProps> = ({images}) => {
    const [lightBoxOpen, setLightBoxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const openLightBox = (index: number) => {
        setSelectedImage(index);
        setLightBoxOpen(true);
    };

    const closeLightBox = () => {
        setLightBoxOpen(false);
        setSelectedImage(null);
    };

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="cursor-pointer"
                        onClick={() => openLightBox(index)}
                    >
                        <img src={image} alt={`Image ${index}`} className="w-full" />
                    </div>
                ))}
            </div>

            {lightBoxOpen && selectedImage !== null && (
                <div className="fixed top-0 left-0 w-full h-screen md:h-auto flex items-center justify-center bg-black bg-opacity-70 z-10">
                    <div className="relative">
                        <span
                            className="absolute top-2 right-2 text-white text-3xl cursor-pointer"
                            onClick={closeLightBox}
                        >
                            <AiOutlineClose className="h-8 w-8" />
                        </span>
                        <div className="my-10">
                            <img
                                src={images[selectedImage]}
                                alt={`Image ${selectedImage}`}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;