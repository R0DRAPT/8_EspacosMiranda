<template>
  <div class="main-container" style="background-color: #292727;">
    <NavbarAposLogin :logo="logo_src" :alt="app_name" />
    <br />
    <!-- BannerSofas -->
    <img class="BannerSofas" :src="BannerSofas" alt="Banner Sofás" />
    <br /><br />
    <h1 class="tituloSofas">Sofás</h1>
    <br />

    <!-- Dropdown-Filtro -->
    <div class="dropdown">
        <button class="btn btn-secondary btn-MostrarTudo" @click="mostrarTodosCampos">
          Mostrar Campos
        </button>
        <button class="btn btn-secondary dropdown-toggle" type="button" id="checkboxDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="toggleDropdown">
          Filtrar Campos
        </button>
      <div class="dropdown-menu" aria-labelledby="checkboxDropdown">
        <label class="dropdown-item" @click="handleItemClick">
          <input type="checkbox" v-model="columnVisibility.nome" class="custom-checkbox" />
          Nome
        </label>
        <label class="dropdown-item" @click="handleItemClick">
          <input type="checkbox" v-model="columnVisibility.tipo" class="custom-checkbox" />
          Tipo
        </label>
        <label class="dropdown-item" @click="handleItemClick">
          <input type="checkbox" v-model="columnVisibility.material" class="custom-checkbox" />
          Material
        </label>
        <label class="dropdown-item" @click="handleItemClick">
          <input type="checkbox" v-model="columnVisibility.extra" class="custom-checkbox" />
          Extra
        </label>
      </div>
    </div>
        <!-- Tabela Informação Sofas -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>
            <label>#</label>
          </th>
          <th scope="col" v-if="columnVisibility.nome">
            <label class="CamposSofas">Nome</label>
          </th>
          <th scope="col" v-if="columnVisibility.tipo">
            <label class="CamposSofas">Tipo</label>
          </th>
          <th scope="col" v-if="columnVisibility.material">
            <label class="CamposSofas">Material</label>
          </th>
          <th scope="col" v-if="columnVisibility.extra">
            <label class="CamposSofas">Extra</label>
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
    toggleDropdown() {
      const dropdown = document.getElementById('checkboxDropdown');
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      } else {
        dropdown.classList.add('show');
      }
    },

    toggleFilter(key, event) {
      this.filterKey = this.filterKey === key ? null : key;
    },

    handleItemClick(event) {
      event.stopPropagation();
    },

    mostrarTodosCampos() {
      for (const key in this.columnVisibility) {
        this.columnVisibility[key] = true;
      }
    },
  }
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

/* DropDown-Filtro */

.btn-MostrarTudo {
  margin-right: 8px; /* Adiciona margem à direita para separar os botões */
  margin-left: 1285px;
  margin-bottom: 3px;
}

.dropdown-toggle {
  margin-bottom: 3px;
}

.custom-checkbox {
  margin-right: 8px;
  vertical-align: middle;
}

.dropdown-menu {
  background-color: #333;
}

.dropdown-item {
  color: white;
  display: flex;
  align-items: center;
}

.dropdown-item input {
  margin-right: 8px;
}

/* Tabela */

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
    cursor: default;
    font-weight: bold;
    font-size: 18px;
}
</style>