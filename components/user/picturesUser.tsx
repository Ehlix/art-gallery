import Image from "next/image";
import Link from "next/link";

type Props = {
  artworks: any[]
  userName: string
};

export function PicturesUser({artworks, userName}: Props) {
  return (
    <div
      className="grid grid-cols-5 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {
        artworks.map((a) => {
          return (
            <Link
              href={`/artwork/${a.id}`}
              key={a.id}
              className="cursor-pointer overflow-hidden group aspect-[1/1] relative flex flex-col justify-end rounded-[5px] w-[100%] h-[100%] bg-t-main transition-all duration-1000 ease-in-out hover:shadow-[inset_0px_-270px_100px_-230px_rgba(0,0,0,0.60)] md:hover:shadow-none ">
              <Image src={`artworks/${a.folder}/${a.thumbnail}`}
                     alt={a.id}
                     className="h-full w-full"
                     height={10}
                     width={10}/>
              <div
                className="absolute flex h-fit w-full items-center opacity-0 transition-all ease-in-out top-[100%] gap-[5px] duration-[600ms] px-[2%] pb-[2%] group-hover:top-[80%] group-hover:opacity-100 md:hidden">
                <div
                  className="shrink-0 grow-0 rounded-full bg-black h-[40px] w-[40px]"></div>
                <div className="flex flex-col items-start text-t-hover-1 text-[14px]">
                  <p className="font-bold leading-none tracking-[1.1px]">{a.title}</p>
                  <p className="leading-5 text-t-hover-1/70 text-[12px]">{userName}</p>
                </div>
              </div>
            </Link>
          );
        })
      }
    </div>
  );
}