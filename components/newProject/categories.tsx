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


    // if (e.currentTarget.checked) {
    //   const newMedium = [...chosenCategories.medium, v];
    //   setChosenCategories({...chosenCategories, medium: [...newMedium]});
    // } else {
    //   const filterCategories = chosenCategories.medium.filter((item) => item !== e.currentTarget.value);
    //   setChosenCategories({
    //     ...chosenCategories,
    //     medium: [...filterCategories]
    //   });
    // }
  }

  function removeSubjectHandler(v: string) {
    const newSubject = chosenCategories.subject.filter(t => t !== v);
    setChosenCategories({...chosenCategories, subject: newSubject});
  }

  function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchSubject(e.currentTarget.value.trimStart());
  }

  return (
    <div className="flex flex-col gap-[10px]">
      <h3 className="">Categorization</h3>
      <h4 className="text-[16px]">Medium</h4>
      <div className="flex flex-wrap gap-[10px]">
        {MEDIUM.map((v) => {
          const disableStatus = chosenCategories.medium.length >= 3 && !(chosenCategories?.medium as string[]).includes(v);
          return (
            <label
              key={v}
              className={cn("select-none cursor-pointer flex items-center justify-start outline-none transition-all gap-[12px] rounded-[5px] px-[15px] p-[10px] border-t-main border-[1px] hover:bg-t-main/25 focus:bg-t-main/25 focus:border-[1px] focus:outline-none", {'hover:bg-t-main/0 cursor-auto': disableStatus})}
            >
              <input
                disabled={disableStatus}
                className="cursor-pointer appearance-none group group-aria-disabled:bg-t-error h-[15px] w-[15px] border-t-main border-[1.7px] rounded-[3px] checked:bg-t-hover-2 checked:border-none disabled:border-t-main/20 disabled:cursor-auto"
                type="checkbox"
                id={v}
                value={v}
                tabIndex={-1000}
                checked={(chosenCategories?.medium as string[]).includes(v)}
                onChange={e => categoriesChangeHandler(e, v)}
              />
              <span
                className={cn(' text-t-hover-1 capitalize', {'text-t-main': disableStatus})}>{v}</span>
            </label>
          );
        })}
      </div>
      <span className="text-t-error">{errors.medium?.message}</span>
      <h4 className="text-[16px]">Subject</h4>


      <div className="flex flex-wrap items-center gap-[5px]">
        {chosenCategories?.subject.map((v => {
          return (
            <div key={v}
                 className="flex h-fit items-center capitalize border-[1px] border-t-main rounded-[3px] bg-t-main/20 text-t-main gap-[3px] text-[16px] px-[10px]">
              <span>{v}</span>
              <button onClick={() => removeSubjectHandler(v)}
                      className="flex items-center justify-center caz-20 gap-[3px] ml-[5px] border-t-main">
                <span className="text-t-error pb-[2px]"><MdClose/></span>
              </button>
            </div>
          );
        }))}

        <input
          className="z-20 flex w-full appearance-none items-center justify-center leading-none outline-none border-t-main border-[2px] mb-[-7px] bg-t-main-2 shadow-t-main h-[35px] rounded-t-[3px] px-[10px] text-[15px] text-t-hover-1 placeholder:text-t-main/40"
          type="text"
          placeholder="search subject"
          onChange={searchHandler}
          value={searchSubject.trimStart()}
        />

        <div
          className="relative flex rounded-t-none border-[2px] border-t-main w-[100%] h-[600px] rounded-[3px]">
          <div className="h-[100%] min-w-[200px]">
            <h3 className="flex items-center pl-[25px] mb-[2%] bg-t-main/20 h-[7%]">Choose
              up to 3 Subject Matter</h3>
            <div
              className="flex flex-col overflow-x-hidden overflow-y-scroll px-[10px] h-[91%]">

              {SUBJECTS.filter((v) => v.name.toLowerCase().includes(searchSubject.toLowerCase())
              ).map(v => {
                const subjectStatus = chosenCategories.subject.includes(v.name);
                return (
                  <div
                    onMouseOver={() => onMouseOverHandler(v)}
                    className="z-10 flex cursor-default items-center justify-between capitalize rounded-[3px] px-[15px] py-[5px] text-t-hover-1 hover:bg-t-main/25"
                    key={v.name}>
                    <span>{v.name}</span>
                    {subjectStatus ?
                      <button onClick={() => removeSubjectHandler(v.name)}
                              className="z-20 flex items-center justify-center gap-[3px] ml-[5px] border-t-main border-[1px] rounded-[3px] bg-t-main-2 h-[35px] px-[10px]">
                        <span className="text-t-error pb-[2px]"><MdClose/></span>
                        <span className="md:hidden">Remove</span>
                      </button> :
                      <button
                        disabled={chosenCategories.subject.length >= 3}
                        className="z-20 flex items-center justify-center gap-[3px] ml-[5px] border-t-main border-[1px] rounded-[3px] bg-t-main-2 h-[35px] px-[10px] disabled:opacity-20"
                        onClick={() => addSubjectHandler(v)}>
                        <span className="text-t-hover-2 pb-[2px]"><MdAdd/></span>
                        <span className="md:hidden">Add</span>
                      </button>
                    }
                  </div>
                );
              })}
            </div>
          </div>


          <div
            className="flex overflow-y-scroll gap-[20px] p-[20px] border-l-[1.7px] border-t-main h-[100%] w-[100%]">
            {currentSubject ?
              <div className="relative flex shrink grow flex-col gap-[10px]">
                <h3 className="text-t-main text-[16px]">SUBJECT MATTER</h3>
                <h4
                  className="capitalize text-t-hover-1 text-[30px]">{currentSubject.name}</h4>
                <p className="text-t-hover-1/90">{currentSubject.description}</p>
                <div
                  className="relative flex h-fit flex-col bg-t-main rounded-[5px] w-[100%] p-[5px]">
                  <h5 className="h-[30px] text-t-main-2/80 text-[16px]">Examples:</h5>
                  <div
                    className="grid grid-cols-4 h-[100%] gap-[10px] lg:gap-[5px] lg:grid-rows-[150px_150px] lg:grid-cols-2">
                    <div className="overflow-hidden rounded-[5px] h-[100%] w-[100%]">
                      <Image className="object-cover w-[100%] h-[100%]"
                             src={currentSubject.link + '/1.jpg'} height={50} width={50}
                             alt="1" quality={50}/>
                    </div>
                    <div className="overflow-hidden rounded-[5px] h-[100%] w-[100%]">
                      <Image className="object-cover w-[100%] h-[100%]"
                             src={currentSubject.link + '/2.jpg'} height={50} width={50}
                             alt="2" quality={50}/>
                    </div>
                    <div className="overflow-hidden rounded-[5px] h-[100%] w-[100%]">
                      <Image className="object-cover w-[100%] h-[100%]"
                             src={currentSubject.link + '/3.jpg'} height={50} width={50}
                             alt="3" quality={50}/>
                    </div>
                    <div className="overflow-hidden rounded-[5px] h-[100%] w-[100%]">
                      <Image className="object-cover w-[100%] h-[100%]"
                             src={currentSubject.link + '/4.jpg'} height={50} width={50}
                             alt="4" quality={50}/>
                    </div>
                  </div>
                </div>
              </div> :
              <div className="flex flex-col items-center justify-center gap-[15px]">
                <h4 className="text-center text-t-hover-1 text-[30px]">Choose up to 3
                  Subject
                  Matter</h4>
                <p className="text-center text-t-hover-1/80 text-[18px]">Properly
                  categorizing your work will help to increase its discoverability
                  and visibility towards potential clients, recruiters and fans.</p>
              </div>}
          </div>


        </div>
      </div>


      <span className="text-t-error">{errors.subject?.message}</span>
    </div>
  );
}