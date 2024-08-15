# Setup blocc CLI action

> Sets up the blocc CLI for GitHub Actions runners.

## About

This action sets up the blocc CLI, [`blocc`](https://github.com/stacc/blocc), on GitHub's hosted Actions runners.

This action can be run on `ubuntu-latest`, `windows-latest`, and `macos-latest` GitHub Actions runners, and will install and expose a specified version of the `blocc` CLI on the runner environment.

## Usage

Setup the `blocc` CLI using the latest version:

```yaml
steps:
- uses: stacc/setup-blocc-cli
```

A specific version of the `blocc` CLI can be installed:

```yaml
steps:
- uses: stacc/setup-blocc-cli
  with:
    version:
      0.21.0
```

## Inputs

The actions supports the following inputs:

- `version`: The version of `blocc` to install, defaulting to latest

## Example job

Coming soon™

## License

[MIT](./LICENSE).

