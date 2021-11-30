# lab-assignment

## Overview

We have created a new website for the survey of lab assignment preferences.

## For Developer

### Tool Version

```zsh
❯ firebase --version
9.22.0

❯ yarn  -v
1.22.10

❯ npm -v
6.14.15

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
|  /admin/users  |  GET  |  Admin User Management Page  |
|  /admin/teachers  |  GET  |  Admin Label Management Page |

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
