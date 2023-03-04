## Vue-Component-Starter

> A template to help you create vue3.x component

You can create yourself component quickly with it.

## Feature

- ⚡️ Serve and build based on [vite](https://github.com/vitejs/vite)
- ✨ Format with [pretty-quick](https://github.com/azz/pretty-quick)
- 🤙🏻 Eslint support
- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest)
- 🦾 TypeScript, of course
- 🎈 Release package easily with [bumpp](https://github.com/antfu/bumpp)
- 📦 Deploy demo with [gh-pages](https://github.com/tschaub/gh-pages)

## Try it now!

> vue-component-starter require Node >=14

### Github Template

[Create repo from this template on Github](https://github.com/peterroe/vue-component-starter/generate)

### Try it now!

```bash
$ pnpm create un
# or 
$ pnpm create un [my-component] -t vue-component-starter
```

Init git hook(optional)

```shell
$ pnpm git-hook-init
```

## Development

Just run and visit <http://localhost:3000>

```shell
$ pnpm dev
```

## Build

To build the Component, run:

```shell
$ pnpm build
```

And you will see the generated fie in `dist` that ready to be served.

## Publish your component

> Before you publish your component, you must give your component a new name in order to prevent conflicts with other people's component names.

You better update the registered component name in `src/index.ts`:

```diff
export function install(app: App) {
- app.component('MyComponent', MyComponent)
+ app.component('yourComponentName', MyComponent)
}
```

Run `pnpm build` again to get the right files.

Make sure your are logged into [npm](https://www.npmjs.com/), and run:

```shell
$ pnpm release 
$ npm publish
```

For more details about publish, please check [bumpp](https://github.com/antfu/bumpp).

## Deploy demo online

You can debug your components online in `demo/App.vue`, and they can be deployed directly.

Just run:

```shell
$ pnpm deploy:demo
```

Then visit `https://[your-username].github.io/[your-component-name]/`, such as <https://peterroe.github.io/vue-component-starter/>
