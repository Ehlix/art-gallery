type Props = {};

export function PicturesUser(props: Props) {
  const aaa = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];
  return (
    <div
      className="grid grid-cols-5 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {
        aaa.map((a, i) => {
          return (
            <div
              key={i}
              className="cursor-pointer overflow-hidden group aspect-[1/1] relative flex flex-col justify-end rounded-[3px] w-[100%] h-[100%] bg-t-main transition-all duration-1000 ease-in-out hover:shadow-[inset_0px_-270px_100px_-230px_rgba(0,0,0,0.60)] md:hover:shadow-none">
              <div
                className="relative flex h-fit w-full opacity-0 transition-all ease-in-out top-[100%] gap-[5px] duration-[600ms] px-[2%] pb-[2%] group-hover:top-0 group-hover:opacity-100 md:hidden">
                <div
                  className="shrink-0 grow-0 rounded-full bg-black h-[40px] w-[40px]"></div>
                <div className="flex flex-col items-start text-t-hover-1 text-[14px]">
                  <p className="font-bold leading-none tracking-[1.1px]">Picture name</p>
                  <p className="leading-5 text-t-hover-1/70 text-[12px]">Nickname</p>
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}