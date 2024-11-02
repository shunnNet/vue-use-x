import { createApp } from 'vue'
import App from './App.vue'
import elementPlus from './element-plus'
import './style.css'

const app = createApp(App)
app
  .use(elementPlus)
  .mount('#app')
