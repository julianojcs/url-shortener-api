# url-shortener-api
An API developing with NodeJs, ExpressJS, TypeScript, Jest, TypeORM and SQLite to short url and persist the data into the SQLite database.

🚀 To run the API:
1) Clone the repository
   $ git clone https://github.com/julianojcs/url-shortener-api.git
2) Install the dependencies
   $ npm install
3) Run the script
   $ npm run express

🔗 Link to the Live API Documentation:
https://jcs-url-shortener.herokuapp.com/

### Developed by:
- **Name**: Juliano Costa Silva
- **Course**: Mobile Development
- **Subject**: Back-End Development for Mobile Applications
- **Class**: 185852
- **Task**: Task 3 and 4

URL shorteners are practical resources when we want to share a Link, basically they take a long url and turn it into a url with few characters. In this practical project we are going to create our own URL shortener. In this way we must have:

- **a method of shortening a URL by persisting it in the database.**
- **a method that returns a shortened url according to an id.**
- **a method that returns all shortened URLs on a specific date.**
- **a method that returns the original url from the shortened URL.**

## Routes:
**1 - Route to access the documentation**
https://jcs-url-shortener.herokuapp.com

**2 - Route to shortener a URL and persist it in the database.**
https://jcs-url-shortener.herokuapp.com/shortener

**ex:**

POST https://jcs-url-shortener.herokuapp.com/shortener
Content-Type: application/json

{
  "url": "https://unyleya.edu.br/"
}

**2 - Route that returns a shortened url according to an id.**

https://jcs-url-shortener.herokuapp.com/shortener/:id

**ex:**

GET https://jcs-url-shortener.herokuapp.com/shortener/318505d0-24f2-48ed-a034-d141c7a5db91

**3 - Route that returns all shortened URLs on a specific date.**

https://jcs-url-shortener.herokuapp.com/shortener/date

**ex:**

POST https://jcs-url-shortener.herokuapp.com/shortener/date
Content-Type: application/json

{
  "date": "2022-09-06T00:00:00.000Z"
}

**4 - Route that returns the original url from the shortened URL.**

https://jcs-url-shortener.herokuapp.com/url

**ex:**

POST https://jcs-url-shortener.herokuapp.com/url
Content-Type: application/json

{
  "shortURL": "https://jcs-url-shortener.herokuapp.com/pnleyzxn"
}

## A route to redirect the shortened url to the original url was also created.

When accessing the address of a shortened url, for example https://jcs-url-shortener.herokuapp.com/pnleyzxn, the browser will redirect the navigation to the original url (ex: https://unyleya.edu.br/).

Through the /api.http file (on the root directory of the application), it is possible to test all routes directly in the VSCode.