import './assets/css/satoshi.css';
import './assets/css/style.css';
import 'jsvectormap/dist/css/jsvectormap.min.css';
import 'flatpickr/dist/flatpickr.min.css';
import './interceptors/axios';
import PrimeVue from 'primevue/config';


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)
app.use(PrimeVue, {
    theme: 'none'
});

app.mount('#app')
