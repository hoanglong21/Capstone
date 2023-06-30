import React from "react";
import { useContext, useState, createContext } from "react";

export const InputContext = createContext();
function Dictionary() {
  //   const [value, setValue] = useState("");
  //   const { inputValue, setInputValue } = useContext(InputContext);

  //   const handleInputChange = e => setValue(e.target.value);

  //   const handleSubmit = () => {
  //     setInputValue(value);
  //     setValue("");
  //   }

  //   const handleInputKeyDown = (e) => {
  //     if(e.key === 'Enter') {
  //       setInputValue(value);
  //       setValue("")
  //     }
  //   }
  return (
    <div className="dictionary_header bg-light">
      <div className="container mx-auto py-8">
        <h3 className="text-3xl font-bold text-center text-black mt-3">
          Nihongo Level Up Dictionary
        </h3>
        <p className="text-center mt-1 mb-10 text-slate-300 text-lg">
          Find definition for word
        </p>

        <div className="justify-center mt-4">
          <div className="text-center form-inline">
            <form class="form-inline w-50" style={{display: "inline-flex"}}>
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
              <button class="btn btn-primary my-2 my-sm-0" type="submit" style={{marginLeft: "1rem"}}>
                Search
              </button>
            </form>
          </div>
        </div>

        {/* {inputValue && (
          <h3 className="text-gray-50 text-center mt-4">
            Result for:{" "}
            <span className="text-white font-bold">{inputValue}</span>
          </h3>
        )} */}
      </div>
    </div>
    
  );
}

export default Dictionary;
