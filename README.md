# aws-laziness :package:

[![License](https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/marciocadev/aws-laziness)
[![NPM version](https://img.shields.io/npm/v/aws-laziness?label=npm%20package&color=brightgreen)](https://badge.fury.io/js/aws-laziness)
![Build](https://github.com/marciocadev/aws-laziness/workflows/build/badge.svg)
![Release](https://github.com/marciocadev/aws-laziness/workflows/release/badge.svg)
[![codecov](https://codecov.io/gh/marciocadev/aws-laziness/branch/main/graph/badge.svg?token=U1R3MKJWJO)](https://codecov.io/gh/marciocadev/aws-laziness)
![Commit activity](https://img.shields.io/github/commit-activity/w/marciocadev/aws-laziness)

Creating source code for lazy people **(this is US :wink:)**

## db-model example
* **key**, **type** - obrigatory fields
* **description** - not mandatory field

### User table example
```
{
  "partitionKey": { "key": "UserId", "type": "string", "description": "User identification" },
  "fields": [
    { "key": "UserName", "type": "string", "description": "User name" }
  ]
}
```
### GameScore table example
```
{
  "partitionKey": { "key": "UserId", "type": "string" },
  "sortKey": { "key": "GameTitle", "type": "string", "description": "Game title" },
  "fields": [
    { "key": "TopScore", "type": "number" },
    { "key": "TopScoreDateTime", "type": "string" },
    { "key": "Wins", "type": "number", "description": "Number of player wins" },
    { "key": "Losses", "type": "number", "description": "Number of player losses" }
    ]
}
```
