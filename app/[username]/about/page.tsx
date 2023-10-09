import React from "react";
import {BsInstagram} from "react-icons/bs";
import {FaXTwitter} from "react-icons/fa6";
import {AiOutlineGlobal} from "react-icons/ai";

export default function About() {
  return (
    <section className="flex justify-center pt-[30px]">
      <div className="flex flex-col text-[18px] w-[55vw] gap-[50px]">
        <div>
          <h3 className="text-[33px] text-t-hover-1 mb-[20px]">Summary</h3>
          <p>Lorem ipsum dolor sitLorem ipsum dolor sitLorem ipsum dolor sitLorem ipsum
            dolor sit amet.</p>
        </div>

        <div>
          <h3 className="text-[33px] text-t-hover-1 mb-[20px]">Contact</h3>
          <div
            className="flex items-center rounded-[3px] bg-t-main/20 px-[20px] h-[40px] mb-[15px]">Email@email.com
          </div>
          <div
            className="flex items-center rounded-[3px] text-[18px] text-t-hover-1 gap-[20px] bg-t-main/20 px-[20px] h-[40px]">
            <a className="hover:text-t-hover-6" href="#"><FaXTwitter/></a>
            <a className="hover:text-t-hover-6" href="#"><BsInstagram/></a>
            <a className="hover:text-t-hover-6" href="#"><AiOutlineGlobal/></a>
          </div>
        </div>

        <div>
          <h3 className="text-[33px] text-t-hover-1 mb-[20px]">Hiring Info</h3>
          <h2 className="mb-[10px]">Interested in:</h2>
          <div
            className="flex items-center rounded-[3px] gap-[20px] bg-t-main/20 px-[20px] h-[40px]">
            <span>Freelance</span>
            <span hidden>Full Time</span>
            <span hidden>Part-time</span>
          </div>
        </div>

        <div>
          <h3 className="text-[33px] text-t-hover-1 mb-[20px]">Skills</h3>
          <p>
            <span>Concept Art</span>
            <span>Sketching</span>
          </p>
        </div>

        <div>
          <h3 className="text-[33px] text-t-hover-1 mb-[20px]">Software</h3>
          <p></p>
        </div>

      </div>

    </section>
  );
}