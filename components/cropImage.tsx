'use client';
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import ImageCropper from "@/components/imageCropper";
import AppSlider from "@/components/appSlider";
import {Thumbnail} from "@/components/newProject/projectMain";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {v4} from "uuid";
import Env from "@/dictionaries/env";

interface Props {
  uniquePath: string;
  setThumbnail: React.Dispatch<React.SetStateAction<Thumbnail | null>>;
  thumbnail: Thumbnail | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CropImage({thumbnail, uniquePath, setThumbnail, setOpen}: Props) {
  const [remoteImage, setRemoteImage] = useState("");
  const [localImage, setLocalImage] = useState("");
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<Blob>();
  const [rotation, setRotation] = useState(0);
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (thumbnail) {
      setRemoteImage("");
      setLocalImage(URL.createObjectURL(thumbnail.file));
      console.log('createLocalImageUrl...');
    }

  }, [thumbnail]);

  const handleOnZoom = useCallback((zoomValue: number) => {
    setZoom(zoomValue);
  }, []);

  const handleOnRotation = useCallback((rotationValue: number) => {
    setRotation(rotationValue);
  }, []);

  const downloadImage = async () => {
    if (!croppedImage) {
      setOpen(false);
    }
    if (croppedImage && thumbnail) {
      const {
        data,
        error
      } = await supabase.storage.from(Env.PROJECTS_BUCKET).remove([`cache/${uniquePath}/${thumbnail.file.name}`]);
      if (data) {
        console.log('cropped start..');
        const file = new File([croppedImage], `thumbnail_${v4()}`, {
          lastModified: new Date().getTime(),
          type: thumbnail.file.type
        });
        setThumbnail({
          id: file.name,
          file: file,
          status: 'notLoaded'
        });
        setOpen(false);
      }
      if (error) {
        console.log(error);
      }

    }

    // const link = document.createElement("a");
    // const name = `${Date.now()}_wallpaper`;
    // link.download = name;
    // link.href = URL.createObjectURL(croppedImage);
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-5">
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
          onChange={handleOnZoom}/>
      </div>

      <div className="flex w-full items-center justify-center">
        <ImageCropper
          zoom={zoom}
          onZoomChange={handleOnZoom}
          rotation={rotation}
          source={remoteImage || localImage}
          onCrop={setCroppedImage}
          width={1080}
          height={1080}/>
      </div>

      <button
        className="flex w-full items-center justify-center rounded p-2 uppercase drop-shadow transition bg-grad-1 text-t-main-2 hover:bg-grad-2"
        onClick={downloadImage}>
        <span>
          Crop
        </span>
      </button>
    </div>
  );
}