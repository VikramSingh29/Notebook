// apiService.js
export const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Login failed");
      }
      return json;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };
  
  export const signup = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Signup failed");
      }
      return json;
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };
  
  export const updateNote = async (noteId, noteData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(noteData),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Update failed");
      }
      return json;
    } catch (error) {
      console.error("Update Note Error:", error);
      throw error;
    }
  };