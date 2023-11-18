export const PicturesMain = () => {
  const aaa = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div
      className="grid grid-cols-6 gap-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {
        aaa.map((v,i) => {
          return (
            <div
              key={i}
              className="cursor-pointer overflow-hidden group aspect-[1/1] relative flex flex-col justify-end rounded-sm w-full h-full bg-t-main transition-all duration-1000 ease-in-out hover:shadow-[inset_0px_-270px_100px_-230px_rgba(0,0,0,0.60)] md:hover:shadow-none">
              <div
                className="relative flex h-fit w-full opacity-0 transition-all ease-in-out top-full gap-1 duration-[600ms] px-1 pb-1 group-hover:top-0 group-hover:opacity-100 md:hidden">
                <div
                  className="shrink-0 grow-0 rounded-full bg-black h-[40px] w-[40px]"></div>
                <div className="flex flex-col items-start text-t-hover-1 text-sm">
                  <p className="font-bold leading-none -tracking-tighter">Picture name</p>
                  <p className="leading-5 text-t-hover-1/70 text-xs">Nickname</p>
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};