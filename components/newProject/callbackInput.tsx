import * as React from 'react';

type Props = {
  callback: (t: string) => void
  placeholder: string
  style: 'input' | 'textarea'
};

export function CallbackInput({callback, placeholder, style}: Props) {
  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    callback(e.currentTarget.value);
  }

  if (style === "input") {
    return (
      <input
        type="text"
        draggable={true}
        placeholder={placeholder}
        onChange={e => changeHandler(e)}
      />);
  } else if (style === 'textarea') {
    return (
      <textarea
        draggable={true}
        placeholder={placeholder}
        onChange={e => changeHandler(e)}
      />
    );
  }
}