import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: ['vue', 'nuxt', '@nuxt/kit', '@nuxt/schema']
})
