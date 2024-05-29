import { createApp } from 'vue';
import './style.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router';

const app = createApp(App); // Create the app instance
app.use(createPinia()); // Use Pinia for state management
app.use(router); // Use Vue Router for routing
app.mount('#app'); // Mount the app to the DOM