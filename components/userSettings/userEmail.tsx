import {FaAsterisk} from "react-icons/fa";
import * as React from "react";
import {useState} from "react";

type Props = {
  email: string
};


export function UserEmail({email}: Props) {
  const [newEmail, setNewEmail] = useState<string>(email || '');
  const [isChange, setChange] = useState<boolean>(false);

  function emailChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setNewEmail(e.currentTarget.value.trimStart())
    if (!isChange) {
      setChange(true)
    }
  }

  return (
    <div className="flex flex-col">
      <h4 className="mb-1 flex gap-1 text-xl text-t-hover-1">
        <FaAsterisk size={10} title="Required" className="cursor-help"/>
        Email
      </h4>
      <p className="mb-1 text-t-hover-1/80">
        The email you use to access.
      </p>
      <input
        maxLength={50}
        minLength={3}
        required
        onChange={emailChangeHandler}
        type="text"
        value={newEmail}
        placeholder=""
      />
      {isChange &&
        <>
          <h4 className="mb-1 mt-3 flex gap-1 text-lg text-t-hover-1/80">
            <FaAsterisk size={10} title="Required" className="cursor-help"/>
            Please enter your password to change your email address
          </h4>
          <input
            maxLength={50}
            minLength={3}
            required

            type="password"

            placeholder=""
          />
        </>
      }
      <span className="text-sm -tracking-tight text-t-error">
            {'errors'}
          </span>
    </div>
  );
}