# url-shortener-api
An API developing with NodeJs, ExpressJS, TypeScript, Jest, TypeORM and SQLite to short url and persist the data into the SQLite database.

To run the API, check the scripts available in the package.json file (run the **npm run express** script)

### Developed by:
- **Name**: Juliano Costa Silva
- **Course**: Mobile Development
- **Subject**: Back-End Development for Mobile Applications
- **Class**: 185852
- **Task**: Task 3

URL shorteners are practical resources when we want to share a Link, basically they take a long url and turn it into a url with few characters. In this practical project we are going to create our own URL shortener. In this way we must have:

- **a method of shortening a URL by persisting it in the database.**
- **a method that returns a shortened url according to an id.**
- **a method that returns all shortened URLs on a specific date.**
- **a method that returns the original url from the shortened URL.**

## Routes for methods::
1 - **a method of shortening a URL by persisting it in the database.**
http://localhost:3000/shortener

**ex:**

POST http://localhost:3000/shortener
Content-Type: application/json

{
  "url": "https://web.whatsapp.com/"
}

2 - **a method that returns a shortened url according to an id.**

http://localhost:3000/shortener/:id

**ex:**

GET http://localhost:3000/shortener/5ffe8b7d-d494-49e4-ad47-5acd031701d9

3 - **a method that returns all shortened URLs on a specific date.**

http://localhost:3000/shortener/date

**ex:**

POST http://localhost:3000/shortener/date
Content-Type: application/json

{
  "date": "2022-09-01T03:00:00.000Z"
}

4 - **a method that returns the original url from the shortened URL.**

http://localhost:3000/url

**ex:**

POST http://localhost:3000/url
Content-Type: application/json

{
  "shortURL": "http://localhost:3000/rmnbyyxf"
}

## A route to redirect the shortened url to the original url was also created.

When accessing the address of a shortened url, for example http://localhost:3000/rmnbyyxf, the browser will redirect the navigation to the original url.

Through the /api.http file (on the root directory of the application), it is possible to test all routes directly in the VSCode.