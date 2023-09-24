export const PicturesMain = () => {
  const aaa = [1, 1, 1, 1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1, 1, 1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  return (
    <>
      {
        aaa.map(() => {
          return (
            <div className="transition-all duration-500 ease-in-out hover:shadow-[inset_0px_-300px_100px_-230px_rgba(0,0,0,0.40)] rounded-[5px] mb-[0.5%] h-[19.6vw] w-[19.6%] bg-neutral-500"></div>
          );
        })
      }
    </>

  );
};