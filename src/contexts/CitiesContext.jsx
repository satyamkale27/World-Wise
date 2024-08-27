import { createContext, useState, useEffect } from "react";
const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, Setcities] = useState([]);
  const [isLoading, SetisLoading] = useState(false);
  useEffect(function () {
    async function fetchCities(params) {
      try {
        SetisLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        Setcities(data);
      } catch {
        alert("There was an error in loding data...");
      } finally {
        SetisLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
export { CitiesProvider };
