import React from "react";
import ReactDOM from "react-dom";

const useState = (() => {
  //the states in the functional component that useState are stored in an array and then accessed by their callId (when in the function they are called)
  const states = [];
  let calls = -1;
  function _useState(defaultValue) {
    console.log(states, calls);
    const callId = ++calls;
    //don't recreate the hook on rerender
    if (states[callId]) {
      return states[callId];
    }

    function setValue(newValue) {
      //modify the value
      states[callId][0] = newValue;
      //rerender app and reset the callId counter
      calls = -1;
      ReactDOM.render(<App />, document.getElementById("root"));
    }

    const hook = [defaultValue, setValue];
    states[callId] = hook;
    return hook;
  }
  return _useState;
})();

function App() {
  const [tacos, setTacos] = useState(5);
  const [opinion, setOpinion] = useState("like");

  const handleAdd = () => {
    setTacos(tacos + 1);
  };
  const handleSubtract = () => {
    setTacos(tacos - 1);
  };
  const handleLike = () => {
    setOpinion("like");
  };
  const handleDislike = () => {
    setOpinion("dislike");
  };

  return (
    <div>
      <div>
        There are {tacos} tacos
        <button onClick={handleAdd}>+</button>
        <button onClick={handleSubtract}>-</button>
      </div>
      <div>
        I {opinion} tacos
        <button onClick={handleLike}>like</button>
        <button onClick={handleDislike}>dislike</button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
