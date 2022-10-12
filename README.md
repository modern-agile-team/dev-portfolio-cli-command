# dev-portfolio-cli-command

[![npm version](https://badge.fury.io/js/create-dev-portfolio.svg)](https://badge.fury.io/js/create-dev-portfolio)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![license_badge](https://img.shields.io/badge/license-MIT-lightgrey)

---

## Getting Started

dev-portfolio-cli-command is a comfortable environment for generate web portfolio.

To create a project, run:

```bash
$ npx create-dev-portfolio [YOUR APP NAME]
```

If you don't type [YOUR APP NAME], 'dev-portfolio' is default.

Running `npx create-dev-portfolio` will result in the following five processes.

1. Check if folder exist named same as [YOUR APP NAME]. ( _in the case folder named same as [YOUR APP NAME] exist , it'll be causes error_ )
2. Check if five necessary dependencies exist below. ( _if you don't have more than one dependency, we warn you_ )
   - **docker**
   - **docker-compose**
   - **node**
   - **npm**
   - **bash**
3. Cloning [create-dev-portfolio](https://github.com/modern-agile-team/create-dev-portfolio).
4. Installing dependencies for `create-dev-portfolio`.
5. Removing useless files like `.git`.

After above five processes, run:

```bash
$ cd [YOUR APP NAME]
$ npm run start:all
```

---

## Refers

### Connected Projects

[dev-portfolio](https://github.com/modern-agile-team/dev-portfolio)
[create-dev-portfolio](https://github.com/modern-agile-team/create-dev-portfolio)

### License

[MIT](https://github.com/modern-agile-team/dev-portfolio-cli-command/blob/master/LICENSE)

### Contributors

- [soonki-98](https://github.com/soonki-98)
- [woorim960](https://github.com/woorim960)
- [seohyunsim](https://github.com/seohyunsim)
- [jisu3817](https://github.com/jisu3817)
