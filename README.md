# EXPERIMENT: FETCH STUDENT DETAILS USING AXIOS IN REACT

### Name: HANIEL REENA D R

### Register Number: 2305001008

## 1. AIM

To develop a React application that uses Axios to send a GET request to an API, retrieve student information in JSON format, and display the details on the webpage.

## 2. ALGORITHM

1. Create a React application using Vite.
2. Install Axios using `npm install axios`.
3. Import `useState` from React and Axios into the application.
4. Create state variables to store student details, loading status and error messages.
5. Define an asynchronous function to send a GET request using `axios.get()`.
6. Receive the API response and store the data using `setStudent()`.
7. Display the student ID, name, email, city, phone number and website.
8. Handle errors using `catch` and loading status using `finally`.
9. Run the application and click the **View Details** button to display the retrieved information.

## 3. PROGRAMS

### Program 1: `src/main.jsx`

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

### Program 2: `src/App.jsx`

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
      setError("Unable to fetch student details.");
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Student Details</h1>

      <button onClick={fetchStudent} disabled={loading}>
        {loading ? "Loading..." : "View Details"}
      </button>

      {error && <p className="error">{error}</p>}

      {student && (
        <div className="student-card">
          <h2>{student.name}</h2>
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>City:</strong> {student.address.city}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
          <p><strong>Website:</strong> {student.website}</p>
        </div>
      )}
    </div>
  );
}
```

### Program 3: `src/index.css`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #f3f4f6;
}
```

### Program 4: `src/App.css`

```css
.container {
  width: 90%;
  max-width: 600px;
  margin: 70px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 25px;
  color: #222;
}

button {
  padding: 12px 24px;
  background: #333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.student-card {
  margin-top: 25px;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 8px;
  text-align: left;
}

.student-card h2 {
  margin-bottom: 15px;
  color: #333;
}

.student-card p {
  margin: 10px 0;
  color: #444;
}

.error {
  margin-top: 20px;
  color: red;
}
```

## 4. OUTPUT

<img width="1910" height="863" alt="image" src="https://github.com/user-attachments/assets/598903d5-0019-4b94-849b-2f1588f1b897" />


<img width="1402" height="770" alt="image" src="https://github.com/user-attachments/assets/bb7817c1-54f4-4d52-912a-0e4539024c85" />



## 5. OBSERVATION

The application successfully sends a GET request using Axios and retrieves student information from the JSONPlaceholder API. The received JSON data is displayed dynamically using React state.

## 6. RESULT

Thus, the React application was successfully developed using Axios to fetch and display student details from an external API.
