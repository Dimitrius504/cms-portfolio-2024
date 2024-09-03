import React, {useState, useEffect} from "react";

const IconForm = ({ onSubmit }) => {
  const [iconName, setIconName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(iconName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={iconName}
        onChange={(e) => setIconName(e.target.value)}
        placeholder="Enter icon name (e.g., FaBeer)"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default IconForm;
