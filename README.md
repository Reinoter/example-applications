# Example Applications

## Install Repository

`yarn install`

## Setup

Create `.env` from `.env.template` and populate values.

## File Upload

#### Pre-requisite

You have to create a bucket with the correct CORS settings on `us-east-1`

#### Run

`yarn start file-upload YOURBUCKET`

This will upload an image from `src/files` to `YOURBUCKET`
