# lab-assignment

## Overview

We have created a new website for the survey of lab assignment preferences.

## For Developer

### URL

> This is a temporary URL and the domain will be changed upon release.

- **Develop env**
  - <https://lab-assignment-dev.web.app/>
  - Deployed when the pull request for **develop** branch is closed
  
- **Production env**
  - <https://assign.nislab.io/>
  - <https://lab-assignment-prod.web.app/>
  - Deployed when the pull request for **main** branch is closed

### Tool Version

> NOT use npm.

```zsh
❯ yarn  -v
1.22.10

❯ node -v
v12.22.17
```

### Routing

|  Resource  |  HTTP Method  |  Notes  |
| ---- | ---- | ---- |
|  /  |  GET  |  Top and Login Page  |
|  /form  |  GET  |  Contact Page  |
|  /user  |  GET  |  Confirm Score Page  |
|  /user/edit  |  GET  |  Score Edit Page  |

### How To Use Repository

1. Fork and Clone the repository
2. Make commits to the forked repository
3. Create a PR in the origin repository

### Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).
