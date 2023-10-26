import {useCallback, useEffect, useState} from "react";

import ImageCropper from "@/components/imageCropper";
import AppSlider from "@/components/appSlider";
import {SelectedFileType} from "@/components/newProject/newProject";

interface Props {
  selectedFile: SelectedFileType;
}

export default function CropImage({selectedFile}: Props) {
  const [remoteImage, setRemoteImage] = useState("");
  const [localImage, setLocalImage] = useState("");
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<Blob>();
  const [rotation, setRotation] = useState(0);

  const isImageSelected = remoteImage || localImage ? true : false;

  useEffect(() => {
    setRemoteImage("");
    setLocalImage(URL.createObjectURL(selectedFile.file));
    console.log('createLocalImageUrl...');
  }, [selectedFile]);

  const handleOnZoom = useCallback((zoomValue: number) => {
    setZoom(zoomValue);
  }, []);

  const handleOnRotation = useCallback((rotationValue: number) => {
    setRotation(rotationValue);
  }, []);

  const downloadImage = async () => {
    if (!croppedImage) return;
    const link = document.createElement("a");
    const name = `${Date.now()}_wallpaper`;
    link.download = name;
    link.href = URL.createObjectURL(croppedImage);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="">
        {/*<AppSlider*/}
        {/*  min={0}*/}
        {/*  max={360}*/}
        {/*  defaultValue={0}*/}
        {/*  value={rotation}*/}
        {/*  label="Rotate"*/}
        {/*  onChange={handleOnRotation}*/}
        {/*/>*/}
        <AppSlider
          min={1}
          max={3}
          value={zoom}
          label="Zoom"
          defaultValue={1}
          onChange={handleOnZoom}
        />
      </div>

      <div className="flex items-center justify-center">
        <ImageCropper
          zoom={zoom}
          onZoomChange={handleOnZoom}
          rotation={rotation}
          onRotationChange={setRotation}
          source={remoteImage || localImage}
          onCrop={setCroppedImage}
          width={1080}
          height={1920}
        />
      </div>

      <button
        className="flex w-full items-center justify-center rounded bg-gray-400 p-2 uppercase text-white drop-shadow transition space-x-1 hover:bg-gray-700"
        onClick={downloadImage}
      >
        <span>Download</span>
      </button>
    </div>
  );
}