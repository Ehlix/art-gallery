export default function Blog() {
  const aaa = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <section
      className="container relative grid grid-cols-4 gap-1 lg:grid-cols-1 xl:grid-cols-3">
      {aaa.map(() => {
        return (
          <>
            <div
              className="overflow-hidden group aspect-[1/0.7] relative flex flex-col justify-end rounded-[3px] w-[100%] h-[100%] bg-t-main transition-all duration-1000 ease-in-out hover:shadow-[inset_0px_-270px_100px_-230px_rgba(0,0,0,0.60)]"></div>
          </>
        );
      })}
    </section>
  );
}