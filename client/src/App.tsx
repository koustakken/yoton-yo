import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button>Notifications {0}</button>
        <p>
          Send get request to <code>http://localhost:3001</code> to create random notification
        </p>
      </div>
      <p className="read-the-docs">Notifications not found</p>
    </>
  );
}

export default App;
