import { useState } from "react";
var data = require("./Mock_Data.json");

export default function App() {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };

  return (
    <div className="App" style={{display: 'flex', justifyContent: 'center'}}>

      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}> Search </button>
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.full_name.toLowerCase();
              const splitFullName = item.full_name.split(" ")
              const splitSearchTerm = value.split(" ")
              console.log("NameArray: ",splitFullName)
              console.log("Searchterm: ",splitSearchTerm)

              return (
                searchTerm &&
                ((fullName.startsWith(searchTerm)) || (searchTerm.substring(0,searchTerm.length-1)===(fullName.substring(0,searchTerm.length-1))) 
                || (splitFullName[0].startsWith(splitSearchTerm[0]) && splitFullName[1].startsWith(splitSearchTerm[1]))) && 
                fullName !== searchTerm                
              );
            })
            .map((item) => (

              <div
                onClick={() => onSearch(item.full_name)}
                className="dropdown-row"
                key={item.full_name}
              >
                {item.full_name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
