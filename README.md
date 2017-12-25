I try to write the code using TDD, but this, of course, is something that is hardly visible after!
 
Anywa,y I first wrote the test in test/accounts_test, according to lab 4 requirements, and then I implemented the API.

Here is the repository

https://github.com/lucabradipus/edx-nodejs-lab04.git

**Testing with mocha and Testing with curl**

after npm install you can run either
 
    npm test  
or 
    
    ./node_modules/.bin/mocha  --exit
    
to run the test scripts based on mocha and chai.    

Or 
   
    node server.js; test/test.sh
    
to run the shell script that will run a set of curl

test.sh use a small awk command to retrieve the ID of the just created account.

   *ID=`curl -H "Content-Type: application/json" -X POST -d '{"balance": "1000", "name": "savings"}' "http://localhost:3000/accounts" |
     awk -F  "[:/}]" '/_id/ {gsub(/"/, "", $5);print  $5 }'`*

I tested on OS X 10.13.2 and I expect that it will work on (almost) all *NIX 

**Environment**

For this assignment  I defined a *test* environment that is set in *account_test.js* file.
The file *_config.js* contains the configuration variables that are set when the 
*process.env.NODE_ENV = 'test'* or when it is left to the default value *development*

In this way I do not mess with the development or production db and I can drop my collections 
at every test run. Also, I change the port for the test server to allow a development app to run 
without clash with the test env


**Validation**

I used mongoose schema to perform validation and I wrote a couple of test about it


**Model**

model is defined in models/accounts.js.

**outes**

routes are in routes/account.js, according to the pattern we have already used in lab 2

**dependencies**

    * body-parser
    * express
    * morgan
    * errorhandler  
    
**development dependencies**

    * chai
    * chai-http
    * mocha
    * node-dev
         
