import React, { useState } from "react";
import { Handle } from "../Home";

interface Props {
  handle: Handle;
  setHandle: React.Dispatch<React.SetStateAction<Handle>>;
}

const AddHandle: React.FC<Props> = ({ handle, setHandle }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHandle({
      ...handle,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <textarea onChange={handleChange} value={handle.name} name="name" placeholder="Your CF handle"></textarea>
    </div>
  );
};

export default AddHandle;
