# ReqRes API Testing Project

## Overview

This project demonstrates API automation testing using Playwright and
JavaScript against the ReqRes REST API.

## Technologies

- JavaScript
- Playwright
- Node.js
- REST API
- Git/GitHub

## API

https://reqres.in

## Project Structure

reqres-api-testing-project/

tests/
utils/
test-data/
reports/

## Setup

### Clone repository

git clone https://github.com/oyejidevictor/reqres-api-testing-project.git

### Install dependencies

npm install

### Install Playwright browsers

npx playwright install

### Configure environment

Copy:

.env.example

to:

.env

Add your ReqRes API key.

## Run Tests

npm test

## Run Users Tests

npm run test:users

## Run Authentication Tests

npm run test:auth

## Run Pagination Tests

npm run test:pagination

## Run Workflow Tests

npm run test:workflow

## Generate Report

npx playwright show-report

## Security

Secrets are stored in `.env` and are excluded from Git using `.gitignore`.

No real API keys should be committed to the repository.

## Test Coverage

The suite contains a minimum of 50 API test cases covering:

- Positive testing
- Negative testing
- Boundary testing
- CRUD
- Authentication
- Pagination
- Schema validation
- Response validation
- API chaining

## Reporting

Playwright HTML reports are generated after test execution.