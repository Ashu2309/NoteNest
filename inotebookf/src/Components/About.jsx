import React, { useContext } from "react";
import noteContext from "./NotesFolder/NoteContext";

const About = () => {
  const context = useContext(noteContext);
  const a = context;
  return (
    <>
      <h1>My name is {a.state.name}</h1>
    </>
  );
};

export default About;
