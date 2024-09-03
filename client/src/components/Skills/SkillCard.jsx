import React from 'react';

const SkillCard = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className="p-6 m-4 rounded-lg shadow-md bg-white h-full cursor-pointer">
      {children}
    </div>
  );
};

export default SkillCard;
