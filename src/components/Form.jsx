import React from "react";

export default function Form(props) {
  const [count, setCount] = props.value;

  return (
    <div className="">
      <label htmlFor="input">Step Count</label>
      <input
        type="text"
        className="form-control"
        id="input"
        onChange={(e) => setCount(e.target.value)}
        placeholder="Enter the step counts"
      />
      <button
        type="submit"
        className="btn btn-primary mt-3"
        onClick={() => props.fn(count)}
      >
        Add Steps
      </button>
    </div>
  );
}
