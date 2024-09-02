import { createContext, useState, useEffect, useContext } from "react";
const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, Setcities] = useState([]);
  const [isLoading, SetisLoading] = useState(false);
  const [currentCity, setCurrentcity] = useState({});
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

  async function getCity(id) {
    try {
      SetisLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentcity(data);
    } catch {
      alert("There was an error in loding data...");
    } finally {
      SetisLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      SetisLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      Setcities((cities) => [...cities, data]); // new city add //
    } catch {
      alert("There was an error in creating city...");
    } finally {
      SetisLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      SetisLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      Setcities((cities) => cities.filter((city) => city.id !== id)); // update the state after deleting from api //
    } catch {
      alert("There was an error in deleting cities...");
    } finally {
      SetisLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const contexts = useContext(CitiesContext);
  if (contexts === undefined)
    throw new Error("CitiesContext was used outside of citiesproviders");
  return contexts;
}

export { CitiesProvider, useCities };
