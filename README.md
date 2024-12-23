# 🛠️ vue-use-x
`vue-use-x` is an unofficial, reusable Vue 3 utility library, which includes many personal preferences.

## Features
- 📝 **Type Safe**: Written in TypeScript with complete type annotations and JSDoc documentation.
- 🪟 **Modal Management**: Effortless management of modal states.
- 🛠️ **Common Utilities**: Provide frequently used functionalities.

## Documetation
Check the [documentation](https://vue-use-x.netlify.app)

## Intro
If [`vueuse`](https://vueuse.org) is like an officially certified supermarket, then `vue-use-x` is more like a small, handcrafted boutique run by an individual. While it doesn’t have everything, you might just find tools that could be helpful.

Unlike `vueuse`, `vue-use-x` is divided into several modules based on functionality, such as `modal`, `query`, and more. These modules are designed to address specific development scenarios and aim to reduce development pain points. However, it also includes modules with small yet general-purpose features, like `common`.

(In reality, I was just too lazy to create a separate repository for each module, so I decided to bundle them all together.)

## Installation
`vue-use-x` is divided into several modules based on different functionalities. If you need to use the features of a specific module, you currently need to install them individually.

```sh
# if you need `modal` package
npm i @vue-use-x/modal

# if you need `common` package
npm i @vue-use-x/common
```

Then, you can import them and use them.

```vue
<script setup lang="ts">
import { useModal } from "@vue-use-x/modal"
import { useContext } from "@vue-use-x/common"

const modal = useModal()

modal.open({ message: "Hello vue-use-x" })

const ctx = useContext()

ctx.provide({ name: "vue-use-x context" })

</script>

```

## Module Introduction
[`@vue-use-x/modal`](https://vue-use-x.netlify.app/modal/use-modal): Provides a composable to toggle modals and pass data. It can be used alongside UI library modals/dialogs. When you need to manage the modal visibility state and pass data multiple times, `useModal` can fully showcase its value.

[`@vue-use-x/common`](https://vue-use-x.netlify.app/common): Provides general-purpose composables to simplify repetitive tasks during development, such as toggling loading states or using `provide`/`inject`, etc.

More modules will be added in the future.

## License
MIT
