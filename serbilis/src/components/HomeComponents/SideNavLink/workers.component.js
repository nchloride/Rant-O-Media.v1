import React, { useState } from "react";
import SearchComponent from "./workersComponents/search.components";
import ResultComponent from "./workersComponents//result.component";
import "../../../styles/workers.css";
import Loader from "../../LoadingPage";
import LoadingScreen from "../../LoadingScreen";
function WorkersComponent() {
  const [searchedUser, setSearchedUser] = useState();
  const [loading, setLoading] = useState();

  return (
    <div className="workers-tab">
      <SearchComponent
        setSearchedUser={setSearchedUser}
        setLoading={setLoading}
      />

      {loading ? (
        <LoadingScreen />
      ) : (
        searchedUser && (
          <div className="results-section">
            {searchedUser.message}
            {searchedUser.results.map((user, index) => (
              <ResultComponent
                user={user}
                functionClass={"result-user"}
                key={index}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default WorkersComponent;
