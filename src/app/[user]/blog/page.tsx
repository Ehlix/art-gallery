export default function Blog() {
const aaa = [1,1,1,1,1,1,1,1,1,1]
  return (
    <div className="px-[3vh] flex gap-[0.5%] flex-wrap">
      {aaa.map(()=>{
        return (
          <>
            <div className="transition-all duration-500 ease-in-out hover:shadow-[inset_0px_-300px_100px_-230px_rgba(0,0,0,0.40)] rounded-[2px] mb-[0.5%] h-[19.6vw] w-[24.6%] bg-neutral-500"></div>
          </>
        )
      })}
    </div>
  );
}