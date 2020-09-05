# GitHub Actions JWT generator

Do you want to send an HTTP request using HTTPie or CURL with a signed JWT token and wondering how you can create the token for a given payload and secret? Well, look no further!

This is a [fork of morzzz007/github-actions-jwt-generator@1.0.1](https://github.com/morzzz007/github-actions-jwt-generator) allowing [jsonwebtoken's](https://www.npmjs.com/package/jsonwebtoken) options object to be passed in, something required if you want to set an expiration on the token.

## Installation

```yaml
- name: JWT Generator
  uses: sgoff0/github-actions-jwt-generator@2.0.1
```

## Usage

The required inputs are `secret` and `payload`.

The output where the generated environment vairable is `JWT_TOKEN`, unless you provide an alternative value in the `envVar` input. The token is generated with default HMAC SHA256 algorithm using npm's [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) under the hood.

### Example usage

```yaml
on: [push]

jobs:
  send:
    name: Send new verison
    runs-on: ubuntu-latest
    steps:
        - name: JWT Generator
        id: jwtGenerator
        uses: sgoff0/github-actions-jwt-generator@2.0.1
        with:
          secret: topSecret
          payload: '{"hello":"world"}'
          options: '{"expiresIn":"5m"}'
          envVar: SOME_OUTPUT_ENV_VAR
      - name: DUMP Token
        run: echo $SOME_OUTPUT_ENV_VAR

```
