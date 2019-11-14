# @coalpha/eslint-config

*A lightweight configuration for eslint vaguely inspired by*
*[eslint-config-airbnb](https://www.npmjs.com/eslint-config-airbnb)!*

## Instructions

`npm install --save-dev @coalpha/eslint-config`

In your [eslint config file](https://eslint.org/docs/user-guide/configuring#configuration-file-formats),
change the `extends` field to `@coalpha`.

## Rant

Currently, this config doesn't support TypeScript.
There's a `tsconfig.json` file there because I might eventually want to use it.
Also, it's terrible how the YAML files use two spaces instead of three but I
couldn't help it. VSCode was being picky and I didn't care enough to fight back.
In the first place, I shouldn't have been using YAML anyways but it happened to
be the fastest. If TOML supported arrays with Objects in them, I might have been
tempted. JSON would have been fine but it's a bit verbose and I also wanted to
try something new. Dhall just doesn't make any sense and I also don't think that
it had tuples but I didn't dig real deep into the documentation because I
couldn't find it.
