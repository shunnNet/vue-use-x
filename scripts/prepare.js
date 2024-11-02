// prepare.js
// prepare will run right after pnpm/npm install
const isCI = process.env.CI !== undefined
// prevent install husky
if (!isCI) {
  console.log('install husky hook')
  console.log('this will configure git config core.hooksPath to .husky')
  import('husky').then((husky) => {
    husky.default()
  })
}
