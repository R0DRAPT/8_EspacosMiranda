<template>
  <div class="main-container" style="background-color: #292727;">
    <NavbarAposLogin :logo="logo_src" :alt="app_name" />
    <br />
    <!-- Banner -->
    <img class="Banner" :src="BannerCadeiras" alt="Banner" />
    <br /><br />
    <h1 class="titulo">Cadeiras</h1>
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
          <input type="checkbox" v-model="columnVisibility.preco" class="custom-checkbox" />
          Preço
        </label>
        <label class="dropdown-item" @click="handleItemClick">
          <input type="checkbox" v-model="columnVisibility.imagem" class="custom-checkbox" />
          Imagem
        </label>
      </div>
    </div>
        <!-- Tabela Informação Sofas -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>
            <label>Id</label>
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
          <th scope="col" v-if="columnVisibility.preco">
            <label class="CamposSofas">Preço</label>
          </th>
          <th scope="col" v-if="columnVisibility.imagem">
            <label class="CamposSofas">Imagem</label>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <th scope="row">{{ item.id }}</th>
          <td v-if="columnVisibility.nome">{{ item.nome }}</td>
          <td v-if="columnVisibility.tipo">{{ item.tipo }}</td>
          <td v-if="columnVisibility.material">{{ item.material }}</td>
          <td v-if="columnVisibility.preco">{{ item.preco }}</td>
          <td v-if="columnVisibility.imagem">
            <button class="btn btn-secondary" @click="verImagem(item.imagem)">Ver Imagem</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para exibir a imagem -->
      <div class="modal fade" id="imagemModal" tabindex="-1" role="dialog" aria-labelledby="imagemModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" v-if="imagemModalSrc" id="imagemModalLabel">{{ getItemNome(imagemModalSrc) }}</h5>
              <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <img :src="imagemModalSrc" alt="Imagem">
            </div>
          </div>
        </div>
      </div>
    <br/><br/>
  </div>
</template>

<script>
import NavbarAposLogin from '../../../components/ComponentsAposLogin/NavbarAposLogin.vue';
import axios from 'axios';

export default {
  name: "Cadeiras",

  components: {
    NavbarAposLogin,
  },

  data() {
    return  { 
      logo_src: "/img/logo.png",
      app_name: "Espaços Miranda",
      userId: null,
      imagemModalSrc: '',
      columnVisibility: {
        nome: true,
        tipo: true,
        material: true,
        preco: true,
        imagem: true,
      },
      // Imagens
      BannerCadeiras: "/img/Catalogo/BannersCatalogo/BannerCadeiras.jpg",
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

    // Fazer solicitação GET para Cadeiras
    axios
      .get('http://localhost:3000/Cadeiras')
      .then((response) => {
        this.items = response.data;
      })
      .catch((error) => {
        console.error('Erro ao obter dados de Consolas:', error);
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

    getItemNome(imagemSrc) {
      const item = this.items.find(item => `/img/catalogo/ImagensArtigos/${item.imagem}` === imagemSrc);
      return item ? item.nome : 'Imagem';
    },

    verImagem(imagemSrc) {
      this.imagemModalSrc = `/img/catalogo/ImagensArtigos/${imagemSrc}`;
      $('#imagemModal').modal('show');
    },

    closeModal() {
      $('#imagemModal').modal('hide');
    },
  }
}
</script>
  
<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

.Banner {
    display: flex;
    width: 1400px;
    margin: 0 auto;
    height: 700px;
}

.titulo {
  color: white;
  text-align: center;
  margin-bottom: 30px;
  color: #b49660;
  font-family: 'Gill Sans MT', 'Trebuchet MS', sans-serif;
  font-size: 50px;
}

/* DropDown-Filtro */

.btn-MostrarTudo {
  margin-right: 8px;
  margin-left: 1285px;
  margin-bottom: 3px;
}

/* Btn-FiltrarCampos */

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

/* Modal */

.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vh;
  margin: 0 auto;
}

.modal-body img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto; 
}

.modal-content {
  width: auto;
  max-width: 90%; /* Ajuste a largura máxima conforme necessário */
  height: auto;
  max-height: 90vh; /* Ajuste a altura máxima conforme necessário */
}
</style>