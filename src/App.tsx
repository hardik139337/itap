import { useEffect, useState } from "react";
import "./App.css";
import { Root } from "./type";

function App() {
  const [data, setData] = useState<Root>();
  const [uiData, setUiData] = useState<Root>();
  const [selectUser, setSelectUser] = useState<number>();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((value) => value.json())
      .then((value) => {
        setData(value);
        setUiData(value);
      })
      .catch(console.log);
  }, []);

  function heandelInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setUiData(
      value
        ? data?.filter(
            (i) =>
              i.name.toLowerCase().includes(value) ||
              i.email.toLowerCase().includes(value)
          )
        : data
    );
  }

  return (
    <div className="maindiv">
      <div>Users list</div>
      <input type="text" onChange={heandelInput}></input>
      <div>
        {uiData?.map((value, index) => (
          <div
            onClick={(event) => setSelectUser(index != selectUser ? index : -1)}
          >
            {index}
            <span className="bold"> {value.name}</span> @{value.username}
            {selectUser == index && (
              <div className="useData">
                <p>email :{value.email}</p>
                <p>phone :{value.phone}</p>
                <p>website :{value.website}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
