import { createApp } from 'vue';
import '@/styles/index.css';
import router from '@/router';
import App from './App.vue';

// Store
import { createPinia } from 'pinia';
const store = createPinia();
//  icons

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '@/plugins/vue-awesome-icons';

createApp(App)
  .use(store)
  .use(router)
  .component('icon', FontAwesomeIcon)
  .mount('#app');
