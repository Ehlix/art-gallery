import * as React from 'react';
import {useState} from 'react';
import {cn} from "@/utils/twMergeClsx";
import {MEDIUM, Subject, SUBJECTS} from "@/dictionaries/categories_data";
import {ChosenCategories} from "@/components/newProject/projectMain";
import {MdAdd, MdClose} from "react-icons/md";
import Image from "next/image";

type Props = {
  chosenCategories: ChosenCategories
  setChosenCategories: React.Dispatch<React.SetStateAction<ChosenCategories>>
  errors: any
};

export function Categories({chosenCategories, setChosenCategories, errors}: Props) {
  const [searchSubject, setSearchSubject] = useState<string>('');
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);

  function categoriesChangeHandler(e: React.ChangeEvent<HTMLInputElement>, v: string) {
    if (e.currentTarget.checked) {
      const newMedium = [...chosenCategories.medium, v];
      setChosenCategories({...chosenCategories, medium: [...newMedium]});
    } else {
      const filterCategories = chosenCategories.medium.filter((item) => item !== e.currentTarget.value);
      setChosenCategories({
        ...chosenCategories,
        medium: [...filterCategories]
      });
    }
  }

  function onMouseOverHandler(v: Subject) {
    setCurrentSubject({...v});
  }

  // function onMouseLeaveHandler() {
  //   setCurrentSubject(null);
  // }


  function addSubjectHandler(v: Subject) {
    if (!chosenCategories.subject.includes(v.name) && chosenCategories.subject.length < 3) {
      const newSubject = [...chosenCategories.subject, v.name];
      setChosenCategories({...chosenCategories, subject: newSubject});
    }
  }

  function removeSubjectHandler(v: string) {
    const newSubject = chosenCategories.subject.filter(t => t !== v);
    setChosenCategories({...chosenCategories, subject: newSubject});
  }

  function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchSubject(e.currentTarget.value.trimStart());
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="">Categorization</h3>
      <h4 className="text-base">Medium</h4>
      <div className="flex flex-wrap gap-2">
        {MEDIUM.map((v) => {
          const disableStatus = chosenCategories.medium.length >= 3 && !(chosenCategories?.medium as string[]).includes(v);
          return (
            <label
              key={v}
              className={cn("select-none cursor-pointer flex items-center justify-start outline-none transition-all gap-3 rounded-md px-3 p-2 border-t-main border hover:bg-t-main/25 focus:bg-t-main/25 focus:border focus:outline-none", {'hover:bg-t-main/0 cursor-auto': disableStatus})}>
              <input
                disabled={disableStatus}
                className="cursor-pointer appearance-none rounded-full border p-0 group group-aria-disabled:bg-t-error h-[15px] w-[15px] border-t-main checked:bg-t-hover-2 checked:border-none disabled:border-t-main/20 disabled:cursor-auto"
                type="checkbox"
                id={v}
                value={v}
                tabIndex={-1000}
                checked={(chosenCategories?.medium as string[]).includes(v)}
                onChange={e => categoriesChangeHandler(e, v)}/>
              <span
                className={cn(' text-t-hover-1 capitalize', {'text-t-main': disableStatus})}>
                {v}
              </span>
            </label>
          );
        })}
      </div>
      <span className="text-t-error">
        {errors.medium?.message}
      </span>
      <h4 className="text-base">
        Subject
      </h4>

      <div className="flex flex-col">
        <div className="mb-2 flex flex-wrap gap-2">
          {chosenCategories?.subject.map((v => {
            return (
              <div key={v}
                   className="flex h-fit items-center gap-1 rounded-sm border px-3 text-base capitalize border-t-main bg-t-main/20 text-t-main">
                <span>{v}</span>
                <button onClick={() => removeSubjectHandler(v)}
                        className="ml-1 flex items-center justify-center gap-1 caz-20 border-t-main">
                <span className="text-t-error pb-0.5">
                  <MdClose/>
                </span>
                </button>
              </div>
            );
          }))}
        </div>

        <input
          className="z-20 flex w-full appearance-none items-center justify-center leading-none outline-none border-t-main border-2 border-b-0 rounded-b-none bg-t-main-2 shadow-t-main h-[35px] rounded-t-md px-2 text-base
           text-t-hover-1 placeholder:text-t-main/40 focus:border-t-main"
          type="text"
          placeholder="search subject"
          onChange={searchHandler}
          value={searchSubject.trimStart()}/>

        <div
          className="relative flex w-full rounded-md rounded-t-none border-2 border-t-main h-[600px]">
          <div className="h-full min-w-[200px]">
            <h3 className="flex items-center justify-center mb-1.5 bg-t-main/20 h-[7%]">
              Choose up to 3 Subject Matter
            </h3>
            <div
              className="flex flex-col overflow-x-hidden overflow-y-scroll px-2 h-[91%]">
              {SUBJECTS.filter((v) => v.name.toLowerCase().includes(searchSubject.toLowerCase())
              ).map(v => {
                const subjectStatus = chosenCategories.subject.includes(v.name);
                return (
                  <div
                    onMouseOver={() => onMouseOverHandler(v)}
                    className="z-10 flex cursor-default items-center justify-between rounded-md px-3 py-1 capitalize text-t-hover-1 hover:bg-t-main/25"
                    key={v.name}>
                    <span>
                      {v.name}
                    </span>
                    {subjectStatus
                      ?
                      <button onClick={() => removeSubjectHandler(v.name)}
                              className="z-20 ml-1 flex items-center justify-center gap-1 rounded-md border px-2 border-t-main bg-t-main-2 h-[35px]">
                        <span className="text-t-error pb-0.5">
                          <MdClose/>
                        </span>
                        <span className="md:hidden">
                          Remove
                        </span>
                      </button>
                      :
                      <button
                        disabled={chosenCategories.subject.length >= 3}
                        className="z-20 ml-1 flex items-center justify-center gap-1 rounded-md border px-2 border-t-main bg-t-main-2 h-[35px] disabled:opacity-20"
                        onClick={() => addSubjectHandler(v)}>
                        <span className="text-t-hover-2 pb-0.5">
                          <MdAdd/>
                        </span>
                        <span className="md:hidden">
                          Add
                        </span>
                      </button>
                    }
                  </div>
                );
              })}
            </div>
          </div>


          <div
            className="flex h-full w-full gap-5 overflow-y-scroll border-l-2 p-5 border-t-main">
            {currentSubject ?
              <div className="relative flex shrink grow flex-col gap-2">
                <h3 className="text-base text-t-main">SUBJECT MATTER</h3>
                <h4
                  className="text-3xl capitalize text-t-hover-1">
                  {currentSubject.name}
                </h4>
                <p className="text-t-hover-1/90">
                  {currentSubject.description}
                </p>
                <div
                  className="relative flex h-fit w-full flex-col rounded-md p-2 bg-t-main">
                  <h5 className="text-base h-[30px] text-t-main-2/80">
                    Examples:
                  </h5>
                  <div
                    className="grid h-full grid-cols-4 gap-2 lg:grid-rows-[150px_150px] lg:grid-cols-2 lg:gap-1">
                    <div className="h-full w-full overflow-hidden rounded-md">
                      <Image className="h-full w-full object-cover"
                             src={currentSubject.link + '/1.jpg'} height={50} width={50}
                             alt="1" quality={50}/>
                    </div>
                    <div className="h-full w-full overflow-hidden rounded-md">
                      <Image className="h-full w-full object-cover"
                             src={currentSubject.link + '/2.jpg'} height={50} width={50}
                             alt="2" quality={50}/>
                    </div>
                    <div className="h-full w-full overflow-hidden rounded-md">
                      <Image className="h-full w-full object-cover"
                             src={currentSubject.link + '/3.jpg'} height={50} width={50}
                             alt="3" quality={50}/>
                    </div>
                    <div className="h-full w-full overflow-hidden rounded-md">
                      <Image className="h-full w-full object-cover"
                             src={currentSubject.link + '/4.jpg'} height={50} width={50}
                             alt="4" quality={50}/>
                    </div>
                  </div>
                </div>
              </div> :
              <div className="flex flex-col items-center justify-center gap-4">
                <h4 className="text-center text-4xl text-t-hover-1">
                  Choose up to 3 Subject Matter
                </h4>
                <p className="text-center text-lg text-t-hover-1/80">
                  Properly categorizing your work will help to increase its
                  discoverability and visibility towards potential clients, recruiters and
                  fans.
                </p>
              </div>}
          </div>
        </div>
      </div>
      <span className="text-t-error">{errors.subject?.message}</span>
    </div>
  );
}