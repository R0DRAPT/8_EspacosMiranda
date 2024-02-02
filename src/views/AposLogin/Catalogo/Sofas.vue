<template>
  <div class="main-container" style="background-color: #292727;">
    <NavbarAposLogin :logo="logo_src" :alt="app_name" />
    <br />
    <!-- BannerSofas -->
    <img class="BannerSofas" :src="BannerSofas" alt="Banner Sofás" />
    <br /><br />
    <h1 class="tituloSofas">Sofás</h1>
    <br />
    
    <!-- Checkbox for each column -->
    <div style="color: white;" >
      <label>
        <input type="checkbox" v-model="columnVisibility.nome" />
        Nome
      </label>
      <label>
        <input type="checkbox" v-model="columnVisibility.tipo" />
        Tipo
      </label>
      <label>
        <input type="checkbox" v-model="columnVisibility.material" />
        Material
      </label>
      <label>
        <input type="checkbox" v-model="columnVisibility.extra" />
        Extra
      </label>
    </div>
    <!-- Tabela Informação Sofas -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col" id="id">#</th>
          <th scope="col" v-if="columnVisibility.nome">
            <button @click="toggleFilter('nome')" class="CamposSofas">Nome</button>
          </th>
          <th scope="col" v-if="columnVisibility.tipo">
            <button @click="toggleFilter('tipo')" class="CamposSofas">Tipo</button>
          </th>
          <th scope="col" v-if="columnVisibility.material">
            <button @click="toggleFilter('material')" class="CamposSofas">Material</button>
          </th>
          <th scope="col" v-if="columnVisibility.extra">
            <button @click="toggleFilter('extra')" class="CamposSofas">Extra</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <th scope="row">{{ item.id }}</th>
          <td v-if="columnVisibility.nome">{{ item.nome }}</td>
          <td v-if="columnVisibility.tipo">{{ item.tipo }}</td>
          <td v-if="columnVisibility.material">{{ item.material }}</td>
          <td v-if="columnVisibility.extra">{{ item.extra }}</td>
        </tr>
      </tbody>
    </table>
    <br /><br />
  </div>
</template>

<script>
import NavbarAposLogin from '../../../components/ComponentsAposLogin/NavbarAposLogin.vue';
import axios from 'axios';

export default {
  name: "Sofas",

  components: {
    NavbarAposLogin,
  },

  data() {
    return  { 
      logo_src: "/img/logo.png",
      app_name: "Espaços Miranda",
      userId: null,
      columnVisibility: {
        nome: true,
        tipo: true,
        material: true,
        extra: true,
      },
      // Imagens
      BannerSofas: "/img/Catalogo/BannersCatalogo/BannerSofas.png",
      // Dados na Tabela
      items: [],
    }
  },

  mounted() {
    // Recupera Dados no localStorage
    const userData = JSON.parse(localStorage.getItem("Register-Info"));
    if (userData) {
      this.username = userData.username;
    }
    // Evento no Login
    this.userId = this.$route.params.id;

    // Fazer solicitação GET para Items_Sofas
    axios
      .get('http://localhost:3000/Items_Sofas')
      .then((response) => {
        this.items = response.data;
      })
      .catch((error) => {
        console.error('Erro ao obter dados de Items_Sofas:', error);
      });
  },

  methods: {
    toggleFilter(key) {
      this.filterKey = this.filterKey === key ? null : key;
    },
  },
}
</script>
  
<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

.BannerSofas {
    display: flex;
    width: 1500px;
    margin: 0 auto;
}

.tituloSofas {
  color: white;
  text-align: center;
  margin-bottom: 30px;
  color: #b49660;
  font-family: 'Gill Sans MT', 'Trebuchet MS', sans-serif;
  font-size: 50px;
}

.table {
    width: 70%;
    margin: 0px auto; 
    font-size: 18px;
    border-collapse: collapse;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 2);
}

/* Cabeçalho da tabela */

thead {
    background-color: #333;
    color: #fff;
}

th, td {
    text-align: left;
    border-bottom: 1px solid #ddd;
}

/* CamposSofas */

.CamposSofas {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: color 0.3s;
    font-size: 18px;
}

.CamposSofas:hover {
  color: #b49660;
}
</style>