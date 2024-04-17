<template>
  <div class="main-container" style="background-color: #292727;">
    <NavbarAposLogin :logo="logo_src" :alt="app_name" />
    <br />
    <!-- BannerSofas -->
    <img class="BannerSofas" :src="BannerSofas" alt="Banner Sofás" />
    <br /><br />
    <h1 class="titulo">Sofás</h1>
    <br />

    <!-- Dropdown-Filtro -->
    <div class="dropdown">
      
        <button class="btn btn-secondary btn-MostrarTudo" @click="mostrarTodosCampos">
          Mostrar Campos
        </button>

        <button class="btn btn-secondary dropdown-toggle" type="button" id="checkboxDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="toggleDropdown" style="margin-bottom: 3px;">
          Filtrar Campos
        </button>

      <div class="dropdown-menu" aria-labelledby="checkboxDropdown">
        <label class="dropdown-item" @click="handleItemClick">
          <input type="checkbox" v-model="columnVisibility.nome" class="custom-checkbox" />
          Nome
        </label>
        <label class="dropdown-item" @click="handleItemClick">
          <input type="checkbox" v-model="columnVisibility.material" class="custom-checkbox" />
          Material
        </label>
        <label class="dropdown-item" @click="handleItemClick">
          <input type="checkbox" v-model="columnVisibility.dimensao" class="custom-checkbox" />
          Dimensão
        </label>
        <label class="dropdown-item" @click="handleItemClick">
          <input type="checkbox" v-model="columnVisibility.preco" class="custom-checkbox" />
          Preço
        </label>
        <label class="dropdown-item" @click="handleItemClick">
          <input type="checkbox" v-model="columnVisibility.imagem" class="custom-checkbox" />
          Imagem
        </label>
        <label class="dropdown-item" @click="handleItemClick">
          <input type="checkbox" v-model="columnVisibility.componentes" class="custom-checkbox" />
          Componentes
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
          <th scope="col" v-if="columnVisibility.material">
            <label class="CamposSofas">Material</label>
          </th>
          <th scope="col" v-if="columnVisibility.dimensao">
            <label class="CamposSofas">Dimensão (cm)</label>
          </th>
          <th scope="col" v-if="columnVisibility.preco">
            <label class="CamposSofas">Preço</label>
          </th>
          <th scope="col" v-if="columnVisibility.imagem">
            <label class="CamposSofas">Imagem</label>
          </th>
          <th scope="col" v-if="columnVisibility.componentes">
            <label class="CamposSofas">Componentes</label>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <th scope="row">{{ item.id }}</th>
          <td v-if="columnVisibility.nome">{{ item.nome }}</td>
          <td v-if="columnVisibility.material">{{ item.material }}</td>
          <td v-if="columnVisibility.dimensao">{{ item.dimensao }}</td>
          <td v-if="columnVisibility.preco">{{ item.preco }}€</td>
          <td v-if="columnVisibility.imagem">
            <button class="btn btn-secondary" @click="verImagem(item.imagem, item.nome)">Ver Imagem</button>
          </td>
          <!-- Btn Componentes -->
          <td class="btnComponentes" v-if="columnVisibility.componentes">
            <button class="btn btn-secondary" @click="openComponenteModal(item.id)">Ver Componentes</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para exibir a imagem -->
    <div class="modal fade" id="imagemModal" tabindex="-1" role="dialog" aria-labelledby="imagemModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-imagem" role="document">
        <div class="modal-content modal-content-imagem">
          <div class="modal-header modal-header-imagem">
            <h5 class="modal-title" v-if="imagemModalSrc" id="imagemModalLabel"><b>{{ imagemModalNome }}</b></h5>
            <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body modal-body-imagem">
            <img :src="imagemModalSrc" alt="Imagem">
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Para Exibir Componentes -->
    <div class="modal modal-l modal-componentes fade" id="componentesModal" tabindex="-1" role="dialog" aria-labelledby="componentesModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-componentes" role="document">
        <div class="modal-content modal-content-componentes">
          <div class="modal-header">
            <h5 class="modal-title" id="componentesModalLabel"><b>{{ selectedSofaName }}</b></h5>
            <button @click="closeComponenteModal" type="button" class="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- btn filtrar e add -->
          <div class="text-right">
            <button class="btn btn-secondary btn-sm" @click="mostrarTodosCamposComponentes" style="margin-right: 8px; margin-top: 14px;">
              Mostrar Campos
            </button>

            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="checkboxDropdownComponentes" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="toggleDropdownComponentes" style="margin-right: 8px; margin-top: 14px;">
                Filtrar Campos
            </button>

            <!-- DropDown Filtro Componentes -->
            <div class="dropdown-menu" aria-labelledby="checkboxDropdownComponentes" v-show="showDropdownComponentes">
              <label class="dropdown-item" @click="handleItemClick">
                <input type="checkbox" v-model="columnVisibilityComponentes.nomeComponentes" class="custom-checkbox"/>
                Nome
              </label>
              <label class="dropdown-item" @click="handleItemClick">
                <input type="checkbox" v-model="columnVisibilityComponentes.dimensaoComponentes" class="custom-checkbox"/>
                Dimensão
              </label>
              <label class="dropdown-item" @click="handleItemClick">
                <input type="checkbox" v-model="columnVisibilityComponentes.precofixoComponentes" class="custom-checkbox"/>
                Preço Fixo
              </label>
              <label class="dropdown-item" @click="handleItemClick">
                <input type="checkbox" v-model="columnVisibilityComponentes.imagemComponentes" class="custom-checkbox">
                Imagem
              </label>
            </div>
          </div>
          <div class="modal-body modal-body-componentes">
            <table class="table table-Componentes">
              <thead>
                <tr>
                  <th>
                    <label>#</label>
                  </th>
                  <th scope="col" v-if="columnVisibilityComponentes.nomeComponentes">
                    <label>Nome</label>
                  </th>
                  <th scope="col" v-if="columnVisibilityComponentes.dimensaoComponentes">
                    <label>Dimensão</label>
                  </th>
                  <th scope="col" v-if="columnVisibilityComponentes.precofixoComponentes">
                    <label>Preço Fixo</label>
                  </th>
                  <th scope="col" v-if="columnVisibilityComponentes.imagemComponentes">
                    <label>Imagem</label>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(componente, id) in selectedSofaComponents" :key="id">
                  <td>{{ id + 1 }}</td>
                  <td v-if="columnVisibilityComponentes.nomeComponentes">{{ componente.nome }}</td>
                  <td v-if="columnVisibilityComponentes.dimensaoComponentes">{{ componente.dimensao }}</td>
                  <td v-if="columnVisibilityComponentes.precofixoComponentes">{{ componente.precofixo }}</td>
                  <td class="ImagensComponentes" v-if="columnVisibilityComponentes.imagemComponentes">
                    <button class="btn btn-secondary" @click="openImageModal(componente.imagem, componente.nome)">Ver Imagem</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Ver Imagem Componente -->
    <div class="modal fade" id="verImagemComponenteModal" tabindex="-1" role="dialog" aria-labelledby="verImagemComponenteModal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="verImagemComponenteModalLabel"><b>{{ selectedComponenteName }}</b></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeImageModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body corpo-modal-imagem">
            <img :src="imagemModalComponenteSrc" alt="Imagem">
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
  name: "Sofas",

  components: {
    NavbarAposLogin,
  },

  data() {
    return  { 
      logo_src: "/img/logo.png",
      app_name: "Espaços Miranda",
      userId: null,
      // imagem
      imagemModalSrc: '',
      // Sofas / Componentes
      selectedSofaName: '',
      imagemModalNome: '',
      // filtros
      columnVisibility: {
        nome: true,
        material: true,
        dimensao: true,
        preco: true,
        imagem: true,
        componentes: true,
      },
      showDropdownComponentes: false,
      columnVisibilityComponentes: {
        nomeComponentes: true,
        materialComponentes: true,
        dimensaoComponentes: true,
        precofixoComponentes: true,
        imagemComponentes: true,
        acoesComponentes: true,
      },
      // componentes
      selectedSofaComponents: [],
      selectedComponenteName: '',
      imagemModalComponenteSrc: '',
      // Imagens
      BannerSofas: "/img/Catalogo/BannersCatalogo/BannerSofas.jpg",
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

    // Fazer solicitação GET para Sofas
    axios
      .get('http://localhost:3000/Sofas')
      .then((response) => {
        this.items = response.data;
      })
      .catch((error) => {
        console.error('Erro ao obter dados de Sofas:', error);
      });
  },

  methods: {
    // ----------------------  Filtro ---------------------- 
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

    // ----------------------  Imagens ---------------------- 

    getItemNome(imagemSrc) {
      const item = this.items.find(item => `/img/catalogo/ImagensArtigos/${item.imagem}` === imagemSrc);
      return item ? item.nome : 'Imagem';
    },

    verImagem(imagemSrc, nome) {
      this.imagemModalSrc = `/img/catalogo/ImagensArtigos/${imagemSrc}`;
      this.imagemModalNome = nome;
      $('#imagemModal').modal('show');
    },

    closeModal() {
      $('#imagemModal').modal('hide');
    },

    // ---------------------- Componentes ---------------------- 

    openComponenteModal(itemId) {
      const selectedSofa = this.items.find(item => item.id === itemId);
      if (selectedSofa) {
        this.selectedSofaName = selectedSofa.nome;

        this.selectedSofaComponents = selectedSofa.componentes;
        $('#componentesModal').modal('show');
      }
    },

    closeComponenteModal() {
      $('#componentesModal').modal('hide');
    },

    // Imagem Componentes

    getItemNome(imagemSrcComponente) {
      const componente = this.selectedSofaComponents.find(comp => `/img/Catalogo/ImagensComponentes/${comp.imagem}` === imagemSrcComponente);
      return componente ? componente.nome : 'Componente';
    },

    openImageModal(imagemSrc, componentName) {
      this.imagemModalComponenteSrc = `/img/Catalogo/ImagensComponentes/${imagemSrc}`;
      this.selectedComponenteName = componentName;
      $('#verImagemComponenteModal').modal('show');
    },

    closeImageModal() {
      $('#verImagemComponenteModal').modal('hide');
    },

    // ---------------------- Filtro Componentes ---------------------- 
        
    toggleDropdownComponentes() {
        this.showDropdownComponentes = !this.showDropdownComponentes;
    },

    toggleFilter(key) {
        this.filterKey = this.filterKey === key ? null : key;
    },

    mostrarTodosCamposComponentes() {
        for (const key in this.columnVisibilityComponentes) {
            this.columnVisibilityComponentes[key] = true;
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
  margin-left: 1368px; /* Casa: 1235px / Escola: 1368px */
  margin-bottom: 3px;
}

/* Btn-FiltrarCampos */

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
    text-align: center;
}

/* CamposSofas */
.CamposSofas {
    background-color: transparent;
    border: none;
    cursor: default;
    font-weight: bold;
    font-size: 18px;
}

/* Cabeçalho da tabela */

thead {
    background-color: #333;
    color: #fff;
}

th, td {
    text-align: center;
    border-bottom: 1px solid #ddd;
}

/* Modal Imagem */

.modal-body-imagem {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-body img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto; 
}

.modal-dialog-imagem {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vh;
  margin: 0 auto;
}

.modal-content-imagem {
  width: auto;
  max-width: 90%;
  height: auto;
}

/* Modal Componentes */

.modal-l .modal-dialog-componentes {
  max-width: 90%;
}

.modal-body-componentes {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog-componentes {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  width: 100%;
  margin: auto;
}

.modal-content-componentes {
  width: 1270px; /* Muda a dimensao da tabela toda */
  height: 100%;
}

/* Modal Componentes */

.table-Componentes {
  width: 1270px; /* Muda a dimensao da tabela toda */
  margin: 0 auto; 
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
    text-align: center;
    border-bottom: 1px solid #ddd;
}

/* Imagem Componente */

.corpo-modal-imagem {
  display: flex;
  justify-content: center;
  align-items: center;
}

.corpo-modal-imagem img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto; 
}

.modal-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vh;
  margin: 0 auto;
}

.modal-content {
  width: auto;
  max-width: 90%; 
  height: auto;
}

</style>