import { UserIcon } from "@/assets/icons/interface-icons";
import { useToast } from "@/hooks";
import { CameraIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ImageInputProps {
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  defaultImageUrl?: string;
}

export default function ImageInput({
  setImage,
  defaultImageUrl,
}: ImageInputProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const { triggerToast } = useToast();

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      triggerToast({
        variant: "small",
        text: "이미지 파일은 png, jpg 형식만 가능합니다.",
        status: "danger",
      });
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      triggerToast({
        variant: "small",
        text: "이미지 파일 크기는 5MB를 초과할 수 없습니다.",
        status: "danger",
      });
      e.target.value = "";
      return;
    }

    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewImage(newPreviewUrl);
    setImage(file);
  };

  return (
    <div className="relative flex items-center justify-center">
      <img
        src={
          previewImage ||
          (imageError || !defaultImageUrl ? UserIcon : defaultImageUrl)
        }
        alt="프로필 이미지"
        width={184}
        height={184}
        className="aspect-square h-full max-h-44 w-full max-w-44 rounded-full object-cover object-center"
        onError={() => {
          if (!previewImage) {
            setImageError(true);
          }
        }}
      />

      <label className="absolute right-2 bottom-2 flex cursor-pointer items-center justify-center rounded-full border-3 border-white bg-neutral-400 p-1.5 transition-colors hover:bg-neutral-500">
        <CameraIcon className="text-white" />
        <input
          type="file"
          className="hidden"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
}
