import React from "react";
import SkillCard from "./SkillCard";

const SkillsCards = ({ category, onClick }) => {
  return (
    <div className="w-full lg:w-1/3 p-4">
      <SkillCard>
        <div className="p-4 shadow-lg rounded-lg" onClick={onClick}>
          <h2 className="text-xl font-semibold mb-2 text-center">{category}</h2>
          <button className="text-blue-500 hover:underline focus:outline-none mt-10">
            Show Skills
          </button>
        </div>
      </SkillCard>
    </div>
  );
};

export default SkillsCards;
