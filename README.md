# @coalpha/eslint-config

## This wasn't meant for other people, so don't use it

Since this config extends eslint:recommended, there's no need to include some things.
There's a lot of dependence on what eslint decides is default.
At some point I may need to update this if eslint changes defaults.
If you think this looks a lot like airbnb's eslint config, you'd be right. I like their config a lot.

## warn

- Saves time
- Has a legitimate use
- Might look better visually

## error

- Gross
- Never any use
- No reason it should happen

## Build

It's easy. `npm run build` and you're done.

### What it does

(I mean, just read `build.js`)

- `base.yml` is parsed
- `rules/*` are parsed
  - modified
  - added to the base object
- `JSON.stringify`
- stripped of extra quotes
- placed in `index.js`
