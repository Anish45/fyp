import React from "react";

function Addrecipe() {
  return (
    <>
      <div className="container">
        <form>
          <div className="row">
            <label>Name of the Recipe</label>
            <input className="form-control" />
          </div>
          <div className="row pt-3">
            <label>Description</label>
            <textarea className="form-control" rows={3} />
          </div>
        </form>
      </div>
    </>
  );
}

export default Addrecipe;
