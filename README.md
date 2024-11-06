# country-info-app-blasaladio
 My implementation of the Full-Stack JS engineer test assessment.

# Technologies Used
- **Backend**: 
  - Node.js
  - Express.js
  - Axios (for API requests)
  - ESLint & Prettier (for linting and code formatting)
  - dotenv (for environment variables)
- **Frontend**: 
  - React
  - Vite (for bundling and dev server)
  - Recharts (for displaying charts)
  - Bootstrap (for styling)

# Installation
- Clone the repository:
```
git clone [<backend-repo-url>](https://github.com/9600bauds/country-info-app-blasaladio.git)
```
- Navigate to the backend and install dependencies:
```
cd backend
npm install
```
- Setup your backend environment variables. These are included in the repository, but in case you don't have them, these are the defaults:
```
PORT=3003
ALL_COUNTRIES_URL=https://date.nager.at/api/v3/AvailableCountries
COUNTRY_INFO_BASE_URL=https://date.nager.at/api/v3/CountryInfo
POPULATION_BASE_URL=https://countriesnow.space/api/v0.1/countries/population
FLAGS_BASE_URL=https://countriesnow.space/api/v0.1/countries/flag/images
```
- Navigate to the frontend and install dependencies:
```
cd ..\frontend
npm install
```

# Running the Application
- Navigate to the backend and run one of either commands:

Development mode (with hot reloading):

`npm run dev`

Production mode:

`npm start`

By default, it will start in port 3003.

- Navigate to the frontend and start it in development node:
`npm run dev`
This will run it in dev mode with Vite. Check `vite.config.js`, by default, it's setup to use port 5173, and to assume the backend is using port 3003.
There is currently no production deployment script for the frontend. You'd have to run `npm run build` and then serve it using something like a hosting provider or the `serve` package.
