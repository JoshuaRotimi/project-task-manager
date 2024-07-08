import React from "react";

const Header = ({ setIsAdding }) => {
  return (
    <header>
      <h1>Project Management Software</h1>
      <div style={{ marginTop: "30px", marginBottom: "18px" }}>
        <button onClick={() => setIsAdding(true)}>Add new Task</button>
        {/*<Logout setIsAuthenticated={setIsAuthenticated} />*/}
      </div>
    </header>
  );
};

export default Header;
