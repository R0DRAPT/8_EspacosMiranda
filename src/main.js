import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faTrashAlt, faPlus, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// Adiciona os ícones ao library do Font Awesome
library.add(faPencilAlt, faTrashAlt, faPlus, faCircleInfo);

// Registra o componente FontAwesomeIcon globalmente
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

// Usa o router e monta o aplicativo
app.use(router).mount('#app');
