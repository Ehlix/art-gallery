import * as React from "react";
import {useState} from "react";
import {MdAdd, MdDelete, MdEdit} from "react-icons/md";
import {validateEmail} from "@/validations/validateEmail";
import {isUrlValid} from "@/validations/validateUrl";
import {useIsMount} from "@/hooks/useIsMount";
import {SocialObject} from "@/components/newProfile/newProfileMain";
import {Tag, tags} from "@/dictionaries/socialCreateTags";

type Props = {
  social: SocialObject
  setSocial: React.Dispatch<React.SetStateAction<SocialObject>>
};

export function Social({social, setSocial}: Props) {
  const isMount = useIsMount();
  const [inputs, setInputs
  ] = useState<SocialObject>({
    publicEmail: '',
    website: '',
    twitter: '',
    facebook: '',
    instagram: '',
  });

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>, tag: Tag) {
    setInputs({...inputs, [tag]: e.currentTarget.value.trim()});
  }


  function validHandler(e: React.FormEvent<HTMLFormElement>, tag: Tag, type: 'site' | 'email' | 'text') {
    e.preventDefault();

    if (type === 'site') {
      const isValid = isUrlValid(inputs[tag]);
      if (isValid) {
        const site = isValid[0].replace(/(^\w+:|^)\/\//, '');
        setSocial({...social, [tag]: `https://${site}`});
      }
      return;
    }
    if (type === 'email') {
      const isValid = validateEmail(inputs[tag]);
      if (isValid) {
        setSocial({...social, [tag]: isValid[0]});
      }
      return;
    }
    if (type === 'text') {
      const validName = inputs[tag].replaceAll(/\s/g, '').toLowerCase();
      const name = `https://www.${tag}.com/${validName}`;
      setSocial({...social, [tag]: name});
    }
    return;
  }

  function changeHandler(tag: Tag) {
    setSocial({...social, [tag]: ''});
  }

  function deleteHandler(tag: Tag) {
    setSocial({...social, [tag]: ''});
    setInputs({...social, [tag]: ''});
  }


  return (
    <div
      className="flex h-fit rounded-[5px] bg-t-main/20 p-[40px] text-[18px] w-[85vw] gap-[20px] sm:p-[5px] sm:w-full md:p-[20px] lg:flex-col">
      <div className="flex shrink grow flex-col justify-between gap-[20px]">
        <div>
          <h3
            className="font-bold mb-[10px] text-[33px] text-t-hover-1 tracking-[0.7px]">
            Social
          </h3>
          <p>
            This fields is not required.
          </p>
        </div>


        {tags.map((v) => {
          return (
            <div key={v.tag} className="">
              <h3 className="mb-[5px]">{v.title}</h3>
              {social[v.tag]
                ?
                <div className="flex justify-between gap-[10px] h-[35px]">
                  <div
                    className="flex items-center transition-all duration-200 text-t-hover-5 hover:text-t-hover-6">
                    <a
                      target="_blank"
                      className="flex gap-[10px]"
                      href={v.type === 'email' ? `mailto:${social[v.tag]}` : social[v.tag]}>
                      <v.icon size={25}/>
                      {social[v.tag]}
                    </a>
                  </div>

                  <div className="flex gap-[10px]">
                    <button onClick={() => changeHandler(v.tag)}
                            className="flex items-center justify-center text-t-hover-1 px-[10px] gap-[5px] bg-t-main-2 border-[2px] border-t-hover-1 hover:text-t-hover-2 hover:border-t-hover-2">
                      <MdEdit size={19}/>
                      Change
                    </button>
                    <button
                      onClick={() => deleteHandler(v.tag)}
                      className="flex items-center justify-center text-t-hover-1 px-[10px] gap-[5px] bg-t-main-2 border-[2px] border-t-hover-1 hover:text-t-error hover:border-t-error">
                      <MdDelete size={19}/>
                      delete
                    </button>
                  </div>
                </div>
                :
                <form className="flex gap-[10px]"
                      onSubmit={(e) => validHandler(e, v.tag, v.type)}>
                  <input
                    autoFocus={!isMount && !social.website}
                    maxLength={50}
                    onChange={e => inputHandler(e, v.tag)}
                    value={inputs[v.tag]}
                    placeholder={v.placeholder}
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center text-t-hover-1 px-[10px] gap-[5px] bg-t-main-2 border-[2px] border-t-hover-1 hover:text-t-hover-2 hover:border-t-hover-2">
                    <MdAdd size={19}/>
                    Add
                  </button>
                </form>
              }
            </div>
          );
        })
        }
      </div>
    </div>
  );
}