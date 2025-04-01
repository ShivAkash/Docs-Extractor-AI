"use client";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImagePickerProps {
  note?: string;
  label?: string;
  required?: boolean;
  className?: string;
}
const ImagePicker: React.FC<ImagePickerProps> = ({
  note = "",
  label = "",
  required,
  className = "",
}) => {
  //   const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleButtonClick = (e: any) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={cn("flex h-60 flex-col  ", className)}>
      <label className="mb-3 block text-base font-medium text-black dark:text-white">
        {label} {required && <span className="text-meta-1">*</span>}
      </label>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <div
        className={`relative flex-1  rounded border  border-stroke bg-transparent dark:border-form-strokedark dark:bg-form-input`}
      >
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div
            onClick={handleButtonClick}
            className="cursor-pointer bg-neutral-600 px-5 py-3 uppercase text-white opacity-80 "
          >
            Upload Image
          </div>
        </div>
        {imageUrl && (
          <Image
            alt="Product Image"
            className="object-contain"
            quality={80}
            src={imageUrl}
            fill
          />
        )}
      </div>

      {note && (
        <div className="mt-3 text-sm text-black dark:text-white">{note}</div>
      )}
    </div>
  );
};

export default ImagePicker;
