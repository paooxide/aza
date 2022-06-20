# User Journey Diagram

<p align="center">
  <a href="https://folham.s3.us-east-2.amazonaws.com/system_architecture-user+journey+diagram.drawio.png" width="720" alt="User journey architecture" /></a>
</p>

<p>
The User can access the service by registering using their email address , creating a profile and then generating an API key and secret that will be used to submit transactions
</p>
<p>
To submit a transactions, the user make use of the generate API key and secret by adding it to the HTTP header of the request when calling the recurrent payment endpoint or simply by authenticating by login in and adding the Bearer Token generated to the HTTP header of the request
</p>

# System Architecture

<p align="center">
  <a href="https://folham.s3.us-east-2.amazonaws.com/system_architecture-system+architecture.drawio.png" width="920" alt="System architecture" /></a>
</p>

<p>
The API uses REST architecture to transfer data to and from the client resource.
The API request journeys throught a NAT API Gateway, to the load balancer that then routes the traffic to the ECS cluster.
</p>
<p>
The ECS cluster comprises of fargat serverless resources from our docker images provided on the Elastic Container Registry.
</p>

<p>
The deployed services uses MongoDB as a database , Elastic Cache as in memory datastore and AWS Cognito for authentication
</p>

### Authentication

<ol>
<li>
  The user register by calling the request OTP endpoint and receives the OTP via their email address provided
</li>
<li>
  The user verifies the OTP by calling the verify OTP endpoint and a HTTP 201 response is returned once the verification is successful
</li>
<li>
  The user then calls the create user profile endpoint that sets their profile data and password
</li>
</ol>

```js
POST / api / v1 / auth / request - otp;
POST / api / v1 / auth / verify - otp;
POST / api / v1 / user;
```

### API Secret and Key

Post authentication

<ol>
<li>
  To generate the API key and API secrete the user call the generate secret endpoint that returns the generated key and secret
</li>
<li>
  To view all generated keys and secret, the user calls the view secret endpoint
</li>
<li>
  The user can delete their secret by calling the delete secret endpoint
</li>
</ol>

```js
GET / api / v1 / chain / generate - secret;
GET / api / v1 / chain / view - secret;
DELETE / api / v1 / chain / delete -secret;
```

### Submitting and viewing Transactions

The user uses the API secret and key generated to call the endpoint to submit recurring payments. Or simply by authenticating by login in and adding the Bearer Token generated to the HTTP header of the request

```js
POST / api / v1 / transactions / create - transaction;

POST / api / v1 / transactions / all;

POST / api / v1 / transactions / { transactionId };
```

The secret and key is added by setting the HTTP Headers

```js
CLIENT_SECRET: XXXXXXXXXXXX;
API_KEY: XXXXXXXXXXX;
```

## Scalability (Proposed)

The system is deployed on AWS ECS cluster using AWS Fargate serverless resources that auto scales on demand

# Description to run on your local machine

To install and run locally make sure you have Docker and NodeJs installed in your local machine

## To install Docker and nodeJS

```bash
# node
$ brew install node

# docker
$ brew install docker
```

## Running the app locally

Make sure you have your docker started up and running then run

```bash
$ docker-compose up
```

To view the Swagger API documentations visit the [localhost](http://127.0.0.1:3000/api/v1/docs) on

> http://127.0.0.1:3000/api/v1/docs

### Technical deployment Architecture

<p align="center">
  <a href="https://folham.s3.us-east-2.amazonaws.com/system_architecture-technical+system+arch.drawio.png" width="720" alt="Technical deployment architecture" /></a>
</p>

## To run tests on your local machine

<br>

```bash
# unit tests
$ npm run test

```

## Support

Contact
[Philip Adeoluwa](mailto:ogunye4pao@gmail.com)
