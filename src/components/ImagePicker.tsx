'use client'
import Image from 'next/image';
import { useRef, useState } from 'react';
export default function ImagePicker({label, name}: {label: string, name: string}) {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | ArrayBuffer>('');

    const handlePickClick = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            if (fileReader.result) {
                setImage(fileReader.result);
            }
        }

        fileReader.readAsDataURL(file);
    };

    return (
        <div>
            <label htmlFor="image">{label}</label>
            <div className="grid grid-cols-2 gap-6 items-start p-2">
                <div className="flex items-center justify-center border border-gray-600 rounded-md p-2 min-w-[100px] min-h-[100px]">
                    {!image && <p></p>}
                    {image && (
                        <Image
                            src={image as string}
                            alt="Selected"
                            width={150}
                            height={150}
                            className="rounded-md"
                        />
                    )}
                </div>

                <input
                    className="hidden"
                    type="file"
                    name={name}
                    accept="image/*"
                    ref={imageInputRef}
                    onChange={handleImageChange}
                />
                <button
                    type="button"
                    onClick={handlePickClick}
                    className="
    bg-teal-500 hover:bg-teal-600 disabled:bg-teal-500/40
    text-white font-semibold

    w-full py-3 px-6
    sm:w-auto sm:py-2 sm:px-5
    lg:py-2 lg:px-4

    inline-flex items-center justify-center

    leading-none

    rounded-lg shadow transition-colors
    focus:outline-none focus:ring-2 focus:ring-teal-400
    focus:ring-offset-2 focus:ring-offset-gray-950
  "
                >
                    Выберите изображение
                </button>


            </div>
        </div>
    );
}