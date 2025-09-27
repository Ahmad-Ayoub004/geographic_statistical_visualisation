import { useState, useEffect } from "react";
import Papa from "papaparse";

// Public USGS endpoint providing earthquake data in CSV format for the past month
const url =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv";

// Custom React Hook to fetch and process geospatial earthquake data
export function useGeoData() {
  // State variables to store the parsed dataset, headers, loading state, and any error
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch and process earthquake data when the component first mounts
    async function fetchGeoData() {
      try {
        // Fetch CSV data from the USGS API
        const response = await fetch(url);
        if (!response.ok) {
          // Throw an error if response is not successful (e.g., 404, 500)
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Convert response body into raw text for CSV parsing
        const text = await response.text();
        // Parse CSV data into JSON using PapaParse
        const results = Papa.parse(text, {
          header: true, // Use the first row as column headers
          dynamicTyping: true, // Convert numeric strings to numbers
          skipEmptyLines: true, // Ignore blank lines
        });

        // Log any parsing errors but continue with whatever data could be parsed
        if (results.errors.length > 0) {
          console.warn("Parsing errors:", results.errors);
        }

        // Process each entry to ensure valid IDs and convert timestamps to ISO Strings
        const structuredData = results.data
          .map((entry, index) => ({
            // Ensure every row has a unique ID
            id:
              entry.id && typeof entry.id === "string" && entry.id.length > 0
                ? entry.id
                : `eq-${index}`, // fallback ID if missing
            ...entry,
            //convert timestamps (if available) to standard ISO format
            time: entry.time ? new Date(entry.time).toISOString() : null,
            updated: entry.updated
              ? new Date(entry.updated).toISOString()
              : null,
          }))
          // Filter rows missing a value / with incomplete entries
          .filter((entry) => entry.place);

        // Store the cleaned dataset in state
        setData(structuredData);

        // Extract column headers
        if (structuredData.length > 0) {
          setHeaders(
            Object.keys(structuredData[0]).filter((key) => key !== "id")
          );
        }
      } catch (err) {
        // Catch network/parsing errors and store in state for UI handling
        console.error("Error fetching or parsing data:", err);
        setError(err);
        setData([]);
        setHeaders([]);
      } finally {
        // Mark loading complete
        setIsLoading(false);
      }
    }

    fetchGeoData();
  }, []); // Empty dependency array ensure it runs once

  //return parsed data
  return { data, headers, isLoading, error };
}
