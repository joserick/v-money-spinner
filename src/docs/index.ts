import { createApp, h } from 'vue'
import App from './app.vue'
import MoneySpinner from '../index'
import './index.css'

const app = createApp({
  render: () => h(App)
});

app.use(MoneySpinner);

app.mount('#app');
