import React from "react";

function Dictionary() {
  return (
    <div className="dictionary_header bg-light">
      <div className="container mx-auto py-8">
        <h4 className="text-3xl font-bold text-center text-black mt-3">
          Nihongo Level Up Dictionary
        </h4>
        <p className="text-center mt-1 mb-10 text-slate-300 text-lg">
          Find definition for word
        </p>

        <div className="justify-center mt-4">
          <div className="text-center form-inline">
            <form class="form-inline w-50" style={{ display: "inline-flex" }}>
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
              <button
                class="btn btn-primary my-2 my-sm-0"
                type="submit"
                style={{ marginLeft: "1rem" }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 max-w-2xl">
        <div>
          <h6 className="text-2xl font-bold mt-4">Meaning & Definitions:</h6>
          <div>
            <div className="meaning">
              <li>ABC</li>
              <hr />
            </div>
          </div>
          <h6 className="text-2xl font-bold mt-4">Example:</h6>
          <div className="meaning">
              <li>Doremi</li>
              <hr />
            </div>
          <h6 className="text-2xl font-bold mt-4">Synonym:</h6>
          <div className="meaning">
              <li>ABC</li>
              <hr />
            </div>
        </div>
      </div>
    </div>
  );
}

export default Dictionary;
