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
    <div className="dictionary_header">
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold text-center text-black mt-4">
          Nihongo Level Up Dictionary
        </h2>
        <p className="text-center mt-1 mb-10 text-slate-300 text-lg">
          Find definition for word
        </p>

        <div className="flex items-center justify-center mt-4">
          <div className="flex border-2 text-center">
            <input
              className="px-4 py-2 md:w-100 rounded-2xl"
              type="text"
              placeholder="Search..."
            />
            <button
              className="bg-blue-400 border-l px-4 py-2 text-black rounded-2xl"
            >
              Search
            </button>
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
