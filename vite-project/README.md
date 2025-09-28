Geographic Statistical Visualisation

A React + Vite project for visualising earthquake data using charts and tables.

This project allows users to explore earthquake events with interactive features such as focus mode, minimum magnitude filtering, and customizable table column headers.

Features

Focus Mode: Highlights and shows only the selected data point in the chart for better clarity.

Minimum Magnitude Filter: Users can filter earthquakes by minimum magnitude to reduce clutter and improve performance.

Custom Column Headers Display: Users can select which table columns to display in the data table, allowing them to focus on the data they care about most.

Project Structure

src/
├─ components/
│ ├─ ChartPanel/ # ScatterChart visualization
│ └─ DataTable/ # Table to display earthquake data
├─ context/ # React context for selection
├─ store/ # Zustand store for selection state
├─ hooks/ # Custom hooks (e.g., useGeoData)
├─ pages/ # Demo pages (PropsDemo, ContextDemo, ZustandDemo)
└─ App.jsx # Entry point
└─ index.css
└─ main.jsx

Installation and Setup guide

git clone https://github.com/Ahmad-Ayoub004/geographic_statistical_visualisation.git
cd vite-project

npm install

npm run dev

External dependencies

Papaparse version 5.5.3 | Parses CSV earthquake data fetched from USGS.
recharts version 3.2.1 | Provides responsive and interactive charts (ex. Scatterplots)
tailwindcss version 4.1.13 | CSS framework for styling components quickly
zustand version 5.0.8 | State management library used for sharing selected data point across components

AI Utilization

1. Data Parsing Guidance: Used AI assistance in the useGeoData hook to understand and implement the papaparse library for parsing CSV earthquake data efficiently
2. Dynamic Scatterplot Axes: Used AI guidance to implement a dropdown menu allowing users to change the X and Y axes of the scatterplot (e.g., magnitude vs. depth or longitude vs. latitude) for more flexible data exploration.
