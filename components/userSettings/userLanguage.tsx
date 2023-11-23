import {FaAsterisk} from "react-icons/fa";
import * as React from "react";

type Props = {};

export function UserLanguage(props: Props) {
  return (
    <div>
      <h3 className="mb-1 flex gap-1 text-xl text-t-hover-1">
        <FaAsterisk size={10} title="Required" className="cursor-help"/>
        Language
      </h3>
      <p className="mb-1 text-t-hover-1/80">
        Use the interface language.
      </p>
      <input
        maxLength={50}

        type="text"

        placeholder=""
      />
      <span className="text-sm -tracking-tight text-t-error">
    {'errors'}
    </span>
    </div>
  );
}