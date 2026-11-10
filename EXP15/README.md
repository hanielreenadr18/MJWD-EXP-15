# Axios Student Details Experiment

**Register Number:** ____________________


## Aim
To develop a React application that uses Axios to send a GET request to an API, receive student information in JSON format, and display the details when the user clicks the **View Details** button.

## Software Requirements
- Node.js and npm
- Visual Studio Code
- React with Vite
- Axios
- A web browser and internet connection

## API Used
`https://jsonplaceholder.typicode.com/users/1`

JSONPlaceholder is a public sample REST API. The returned profile is demonstration data, not an official college student record.

## Procedure
1. Create a React project using Vite.
2. Install the project dependencies and Axios.
3. Import `useState` from React and `axios` from Axios.
4. Create state variables to store the student data, loading status and error.
5. When **View Details** is clicked, call `axios.get()` using the API URL.
6. Store `response.data` in the student state.
7. Display the student ID, name, email, city, phone and website.
8. Handle request errors using `catch` and reset the loading state using `finally`.

## Create the project
```bash
npm create vite@latest Axios_Student_Details_Experiment -- --template react
cd Axios_Student_Details_Experiment
npm install
npm install axios
```

## Folder Structure
```text
Axios_Student_Details_Experiment/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
├── screenshots/
│   ├── 01-dashboard-initial.png
│   ├── 02-loading-state.png
│   └── 03-axios-response.png
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── main.jsx
```

## Complete Source Code

### `src/main.jsx`
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### `src/App.jsx`
```jsx
import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/users/1";

export default function App() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStudent = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(API_URL);
      setStudent(response.data);
    } catch (err) {
      setError("Unable to retrieve student information. Please try again.");
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="simple-demo">
      <h1>Student Details</h1>
      <p>Axios GET request demonstration</p>
      <button onClick={fetchStudent} disabled={loading}>
        {loading ? "Loading..." : "View Details"}
      </button>
      {error && <p className="error">{error}</p>}
      {student && (
        <section className="student-result">
          <h2>{student.name}</h2>
          <p><b>Student ID:</b> {student.id}</p>
          <p><b>Email:</b> {student.email}</p>
          <p><b>City:</b> {student.address.city}</p>
        </section>
      )}
    </main>
  );
}
```

> The application interface in this project is a Student Records Portal. The compact source above shows the core Axios logic required by the experiment; the actual portal layout and styling are implemented in `src/App.jsx` and `src/App.css` in this project.

## Run the Application
```bash
npm install
npm run dev
```
Open the local URL printed by Vite, usually `http://localhost:5173/`. Click **View Details**. The profile should appear after the API responds.

## Build Verification
```bash
npm run build
```

## Output
The portal displays a student profile containing ID, name, email, city, phone and website after a successful Axios GET request. Screenshots in the `screenshots` folder are illustrative layout previews; capture fresh screenshots from your running browser for actual execution evidence.

## Observation
Axios sends an HTTP GET request to the specified API endpoint. The JSON response is accessed through `response.data` and stored in React state. The interface updates when the state changes.

## Result
Thus, a React application was developed successfully using Axios to retrieve JSON student information from an API and display the details when the user clicks **View Details**.

## Viva Questions
1. **What is Axios?** A promise-based JavaScript HTTP client used to make API requests.
2. **What is a GET request?** An HTTP method used to retrieve data from a server.
3. **Why is Axios used in React?** To communicate with APIs and retrieve or send data.
4. **What does `axios.get()` do?** Sends an HTTP GET request to the given URL.
5. **What is JSON?** JavaScript Object Notation, a lightweight data-interchange format.
6. **What is `response.data`?** The response body returned by Axios.
7. **What is `useState`?** A React Hook used to store and update component state.
8. **Why use `async/await`?** To write promise-based asynchronous code in a readable way.
9. **What is `catch` used for?** To handle errors when the request fails.
10. **Why use `finally`?** To run cleanup code whether the request succeeds or fails.

## GitHub Upload
Create a GitHub repository named `Axios-Student-Details-Experiment`, then run:
```bash
git init
git add .
git commit -m "Add Axios Student Details Experiment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/Axios-Student-Details-Experiment.git
git push -u origin main
```
Replace `YOUR-USERNAME` with your GitHub username.
