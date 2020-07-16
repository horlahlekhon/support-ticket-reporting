#### Support Ticket reporting

##### Run
There are two ways to run the project.

* Docker

    To run the project using docker, all the configuration has been made. just clone the project locally with

        `git clone git@github.com:horlahlekhon/ticket-reporting.git`

    Then run the project with, it will pull a mongodb container and run it and build the project and run:
        `npm run docker:dev`

* Natively locally: project can also be ran locally by providing a mongodb instance listening at port 27017.

    Note: this is assuming there is nodejs > version 10 installed with npm.
    Kindly follow the below steps to run locally :
    * `git clone git@github.com:horlahlekhon/ticket-reporting.git` // clone the project locally
    * `npm i` // install dependencies
    * `npm start` // this will startup the nodejs express server in development mode. there is no production mode since this is just a test.

After the server is up, the API documentation can be found at localhost:3000/api/

##### Test
To run the test suites, regardless of either running on docker or locally. the tests can be ran using the floowing commands:

    * `npm test` // run all the tests including jest and cypress tests with code coverage
    *  `npm run cypress-test ` // will only run cypress integration  tests
    * `npm run unit-test`  // will run the unit tests alone


##### Requirements not covered
Below are the requirements i did not cover due to one reason or another:

    * using TypeScript :
        I failed to use typescript because i have little to no experience using the language, and I do not want to use the lack of deep knowledge
        of one language to deter my chance of building the solution to fit the requirements.

    * A front end :
        I did not include a front end in the code because, one there is no clear specification of a requirement for a front end implementation,
         and secondly, i am mostly a backend and devops engineer,
        i see my self as an engineer who veer mostly to the backend and ops part of software development.


##### Assumptions
    Instead of only making the support request downloads to download only a month data,
     i made it flexible where one can set  the time frame using query parametres.

Thanks for the opportunity.
