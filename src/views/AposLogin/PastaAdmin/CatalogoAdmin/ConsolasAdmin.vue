<template>
  <div class="main-container" style="background-color: #292727;">
    <NavbarAdmin :logo="logo_src" :alt="app_name" />
    <br />
    <!-- Banner -->
    <img class="Banner" :src="BannerConsolas" alt="Banner" />
    <br /><br />
    <h1 class="titulo">Consolas</h1>
    <br />

    <!-- Dropdown-Filtro -->
    <div class="dropdown">

      <button class="btn btn-secondary btn-MostrarTudo" @click="mostrarTodosCampos">
        Mostrar Campos
      </button>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="checkboxDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="toggleDropdown">
        Filtrar Campos
      </button>

      <button class="btn btn-primary btn-add" @click="openAddModal">
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>

      <!-- Modal ADD Consola -->
      <div class="modal modal-add" id="modalAdd" :class="{ 'show': showAddModal }" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content" style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 60%; border-radius: 10px;">
            <div class="modal-header">
              <h5 class="modal-title"><b>Adicionar Consola</b></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeAddModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <!-- Campo Nome -->
              <div class="form-group">
                <label for="nome">Nome:</label>
                <input type="text" class="form-control" id="nome" v-model="novoConsola.nome" autocomplete="off">
              </div>
              <!-- Campo Material -->
              <div class="form-group">
                <label for="material">Material:</label>
                <input type="text" class="form-control" id="material" v-model="novoConsola.material" autocomplete="off">
              </div>
              <!-- Campo Dimensão -->
              <div class="form-group">
                  <label for="dimensao">Dimensão:</label>
                  <input type="text" class="form-control" id="dimensao" v-model="novoConsola.dimensao" autocomplete="off">
                </div>
              <!-- Campo Preço -->
              <!-- <div class="form-group">
                <label for="preco">Preço:</label>
                  <div class="input-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text">€</span>
                      </div>
                      <input type="number" class="form-control" id="preco" v-model="novoConsola.preco" autocomplete="off">
                  </div>
              </div> -->
              <!-- Campo Imagem -->
              <div class="form-group">
                  <label for="imagem">Imagem:</label>
                  <input type="text" class="form-control" id="imagem" v-model="novoConsola.imagem" @input="updateImage" autocomplete="off">
              </div>
              <!-- Exibição dinâmica da imagem -->
              <div class="corpo-modal-imagem" v-if="novoConsola.imagem">
                  <img :src="`/img/catalogo/ImagensArtigos/${novoConsola.imagem}`" alt="Imagem">
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-lg btn-info" @click="addConsola">Adicionar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- DropDown Filtro -->
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
        <label class="dropdown-item" @click="handleItemClick">
          <input type="checkbox" v-model="columnVisibility.acoes" class="custom-checkbox" />
          Ações
        </label>
      </div>
    </div>

    <!-- Tabela Informação Consolas -->
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>
            <label>#</label>
          </th>
          <th scope="col" v-if="columnVisibility.nome">
            <label class="CamposConsolas">Nome</label>
          </th>
          <th scope="col" v-if="columnVisibility.material">
            <label class="CamposConsolas">Material</label>
          </th>
          <th scope="col" v-if="columnVisibility.dimensao">
            <label class="CamposConsolas">Dimensão (cm)</label>
          </th>
          <th scope="col" v-if="columnVisibility.preco">
            <label class="CamposConsolas">Preço</label>
          </th>
          <th scope="col" v-if="columnVisibility.imagem">
            <label class="CamposConsolas">Imagem</label>
          </th>
          <th scope="col" v-if="columnVisibility.componentes">
            <label class="CamposConsolas">Componentes</label>
          </th>
          <th scope="col" v-if="columnVisibility.acoes">
            <label class="CamposConsolas">Ações</label>
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

          <!-- Botões de edição e eliminar -->
          <td class="TextAcoes" v-if="columnVisibility.acoes">
            <!-- Botão Editar -->
            <button class="btn btn-primary btn-sm" @click="openEditModal(item)" title="Editar Consola">
              <FontAwesomeIcon :icon="['fas', 'pencil-alt']" />
            </button>
            <!-- Botão Remover -->
            <button class="btn btn-danger btn-sm" @click="confirmDeleteConsola(item.id)" title="Remover Consola">
              <FontAwesomeIcon :icon="['fas', 'trash-alt']" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para editar Consola -->
    <div class="modal" :class="{ 'show': showEditModal }" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content" style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 60%; border-radius: 10px;">
          <div class="modal-header">
            <h5 class="modal-title"><b>Editar Consola</b></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeEditModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" >
            <form class="user-form">
              <div class="mb-3" style="font-family: Verdana;">
                <input type="text" class="form-control" placeholder="Novo Nome" v-model="editedConsola.nome">
              </div>
              <div class="mb-3" style="font-family: Verdana;">
                <input type="text" class="form-control" placeholder="Novo Material" v-model="editedConsola.material">
              </div>
              <div class="mb-3" style="font-family: Verdana;">
                <input type="text" class="form-control" placeholder="Nova Dimensão" v-model="editedConsola.dimensao">
              </div>
              <!-- <div class="mb-3" style="font-family: Verdana;">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">€</span>
                    </div>
                    <input type="number" class="form-control" placeholder="Novo Preço" v-model="editedConsola.preco">
                </div>
              </div> -->
              
              <div class="mb-3" style="font-family: Verdana;">
                <input type="text" class="form-control" placeholder="Nova imagem" v-model="editedConsola.imagem">
              </div>

              <div class="mb-3 corpo-modal-imagem-EditarConsola" v-if="editedConsola.imagem" style="font-family: Verdana;">
                  <img :src="`/img/catalogo/ImagensArtigos/${editedConsola.imagem}`" alt="Imagem">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn-lg btn-info" @click="saveConsolaChanges">Salvar Modificações</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para exibir a imagem -->
    <div class="modal fade" id="imagemModal" tabindex="-1" role="dialog" aria-labelledby="imagemModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="imagemModalLabel"><b>{{ imagemModalNome }}</b></h5>
            <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body corpo-modal-imagem">
            <img :src="imagemModalSrc" alt="Imagem">
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Para Exibir Componentes -->
    <div class="modal fade modal-l modal-componentes" id="componentesModal" tabindex="-1" role="dialog" aria-labelledby="componentesModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-componentes" role="document">
          <div class="modal-content modal-content-componentes">
            <div class="modal-header">
              <h5 class="modal-title" id="componentesModalLabel"><b>{{ selectedConsolaName }}</b></h5>
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
                <label class="dropdown-item" @click="handleItemClick">
                  <input type="checkbox" v-model="columnVisibilityComponentes.acoesComponentes" class="custom-checkbox"/>
                  Ações
                </label>
              </div>


              <!-- Botão Abrir Modal Add Componente -->
              <button class="btn btn-primary btn-sm ml-auto" @click="openAddComponenteModal" title="Adicionar Componente" style="margin-right: 8px; margin-top: 14px;">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </button>

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
                    <th scope="col" v-if="columnVisibilityComponentes.acoesComponentes">
                      <label>Ações</label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(componente, id) in selectedConsolaComponents" :key="id">
                    <td>{{ id + 1 }}</td>
                    <td v-if="columnVisibilityComponentes.nomeComponentes">{{ componente.nome }}</td>
                    <td v-if="columnVisibilityComponentes.dimensaoComponentes">{{ componente.dimensao }}</td>
                    <td v-if="columnVisibilityComponentes.precofixoComponentes">{{ componente.precofixo }}</td>
                    <td class="ImagensComponentes" v-if="columnVisibilityComponentes.imagemComponentes">
                      <button class="btn btn-secondary" @click="openImageModal(componente.imagem, componente.nome)">Ver Imagem</button>
                    </td>
                    <!-- Botões Ações Componentes -->
                    <td class="TextAcoes" v-if="columnVisibilityComponentes.acoesComponentes">
                      <!-- Botão Editar Componente -->
                      <button class="btn btn-primary btn-sm" @click="openEditModalComponente(componente.id)" title="Editar Componente">
                        <FontAwesomeIcon :icon="['fas', 'pencil-alt']" />
                      </button>
                      <!-- Botão Remover Componente -->
                      <button class="btn btn-danger btn-sm" @click="confirmDeleteComponente(componente.id)" title="Remover Componente">
                        <FontAwesomeIcon :icon="['fas', 'trash-alt']" />
                      </button>
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

      <!-- Modal Add Componente Consola -->
      <div class="modal modal-add-componente" id="addComponenteModal" :class="{ 'show': showComponenteAddModal }" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-componente" role="document">
          <div class="modal-content modal-content-componente" style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 60%; border-radius: 10px;">
            <div class="modal-header modal-header-componente">
              <h5 class="modal-title  modal-title-componente"><b>Adicionar Componente</b></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeAddComponenteModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <!-- Campo Nome -->
              <div class="form-group">
                <label for="nome">Nome:</label>
                <input type="text" class="form-control" id="nome" v-model="novoComponenteConsola.nome" autocomplete="off">
              </div>
              <!-- Campo Dimensão -->
              <div class="form-group">
                <label for="dimensao">Dimensão:</label>
                <input type="text" class="form-control" id="dimensao" v-model="novoComponenteConsola.dimensao" autocomplete="off">
              </div>
              <!-- Campo Preço Fixo-->
              <div class="form-group">
                <label for="precofixo">Preço Fixo:</label>
                  <div class="input-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text">€</span>
                      </div>
                      <input type="number" class="form-control" id="precofixo" v-model="novoComponenteConsola.precofixo" autocomplete="off">
                  </div>
              </div>
              <!-- Campo Imagem -->
              <div class="form-group">
                  <label for="imagem">Imagem:</label>
                  <input type="text" class="form-control" id="imagem" v-model="novoComponenteConsola.imagem" @input="updateImage" autocomplete="off">
              </div>
              <!-- Exibição dinâmica da imagem -->
              <div class="corpo-modal-imagem" v-if="novoComponenteConsola.imagem">
                  <img :src="`/img/Catalogo/ImagensComponentes/${novoComponenteConsola.imagem}`" alt="Imagem">
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-lg btn-info" @click="addComponenteConsola">Adicionar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Editar Componente Consola -->
      <div class="modal modalEditarComponente" :class="{ 'show': showEditModalComponente }" tabindex="-1" role="dialog" style="z-index: 1060;">
        <div class="modal-dialog modalEditarComponente-dialog" role="document">
          <div class="modal-content modalEditarComponente-content" style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 60%; border-radius: 10px;">
            <div class="modal-header modalEditarComponente-header">
              <h5 class="modal-title modalEditarComponente-tilte"><b>Editar {{ selectedComponenteName }}</b></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeEditModalComponente">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body modalEditarComponente-body">
              <form class="user-form modalEditarComponente-userform">
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="Novo Nome" v-model="editedComponente.nome">
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="Nova Dimensão" v-model="editedComponente.dimensao">
                </div>
                <div class="mb-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">€</span>
                    </div>
                    <input type="number" class="form-control" placeholder="Novo Preço" v-model="editedComponente.precofixo">
                  </div>
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="Nova imagem" v-model="editedComponente.imagem">
                </div>
                <div class="mb-3 corpo-modal-imagem" v-if="editedComponente.imagem">
                  <img :src="`/img/catalogo/ImagensComponentes/${editedComponente.imagem}`" alt="Imagem">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn-lg btn-info" @click="saveComponenteChanges(this.editedComponente.id)">Salvar Modificações</button>
            </div>
          </div>
        </div>
      </div>

    <br/><br/>
  </div>
</template>

<script>
import NavbarAdmin from '../../../../components/ComponentsAposLogin/NavbarAdmin.vue';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: "ConsolasAdmin",

  components: {
    NavbarAdmin,
    FontAwesomeIcon
  },

  data() {
    return  { 
      logo_src: "/img/logo.png",
      app_name: "Espaços Miranda",
      userId: null,
      // imagem      
      imagemModalSrc: '',
      imagemModalComponenteSrc: '',
      imagemModalNome: '',
      // Modais
      showEditModal: false,
      showAddModal: false,
      showComponenteAddModal: false,
      // Consolas / Componentes
      selectedConsolaName: '',
      selectedComponenteName: '',
      currentConsolaId: null,
      editedConsola: {},
      editedComponente: {},
      // filtros
      columnVisibility: {
        nome: true,
        material: true,
        dimensao: true,
        preco: true,
        imagem: true,
        componentes: true,
        acoes: true,
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
      // Adicionar
      novoConsola: {
        nome: '',
        dimensao: '',
        material: '',
        preco: null,
        imagem: ''
      },
      // Componentes
      novoComponenteConsola: {
        nome: '',
        dimensao: '',
        precofixo: '',
        imagem: ''
      },
      // Imagens
      BannerConsolas: "/img/Catalogo/BannersCatalogo/BannerConsolas.jpg",
      // Dados na Tabela
      items: [],
      selectedConsolaComponents: [],
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

    // Fazer solicitação GET para Consolas
    axios
      .get('http://localhost:3000/Consolas')
      .then((response) => {
        this.items = response.data;
        // Calcular Orçamento
        this.calcularPrecoTotalComIVA();
      })
      .catch((error) => {
        console.error('Erro ao obter dados de Consolas:', error);
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

    // ----------------------  Ações ---------------------- 
    
    openEditModal(item) {
      this.showEditModal = true;
      this.editedConsola = { ...item };
    },

    closeEditModal() {
      this.showEditModal = false;
    },

    saveConsolaChanges() {
    // Verifica se a imagem inserida existe na pasta /public/img/catalogo/ImagensArtigos/
    axios.get(`/img/catalogo/ImagensArtigos/${this.editedConsola.imagem}`)
      .then(() => {
        // Se a imagem existe, continua com a atualização do Consola
        this.editedConsola.preco = parseFloat(this.editedConsola.preco.toString().replace('€', '').trim());
        const ConsolaIdToUpdate = this.editedConsola.id;
        const updatedData = {
          nome: this.editedConsola.nome,
          material: this.editedConsola.material,
          dimensao: this.editedConsola.dimensao,
          preco: this.editedConsola.preco,
          imagem: this.editedConsola.imagem,
        };

        axios.put(`http://localhost:3000/Consolas/${ConsolaIdToUpdate}`, updatedData)
          .then(response => {
            console.log("Dados da Consola atualizados com sucesso:", response.data);
            // Toastr de sucesso
            toastr.success("Consola Editada com sucesso. (Reiniciando a página em 5 segundos)", "Sucesso", {
              closeButton: true,
              positionClass: "toast-bottom-right",
              progressBar: true,
              timeOut: 5000,
              extendedTimeOut: 1000,
              preventDuplicates: true,
              showMethod: "fadeIn",
              hideMethod: "fadeOut",
              toastClass: "toast-success",
            });
            // Feche o modal de edição
            this.closeEditModal();
            // f5 na pagina
            setTimeout(() => {
                location.reload();
              }, 5000);  
          })
          .catch(error => {
            console.error("Erro ao atualizar dados da Consola:", error);
            // Toastr de erro
            toastr.error("Erro ao editar a Consola.", "Erro!", {
              closeButton: true,
              positionClass: "toast-bottom-right",
              progressBar: true,
              timeOut: 5000,
              extendedTimeOut: 1000,
              preventDuplicates: true,
              showMethod: "fadeIn",
              hideMethod: "fadeOut",
              toastClass: "toast-error",
            });
          });
      })
      .catch(() => {
        // Se a imagem não existe, exibe o toastr de erro
        toastr.error("Adicione Primeiro A Imagem Na Pasta Correta (Imagens Artigos)", "Erro!", {
          closeButton: true,
          positionClass: "toast-bottom-right",
          progressBar: true,
          timeOut: 5000,
          extendedTimeOut: 1000,
          preventDuplicates: true,
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
          toastClass: "toast-error",
        });
      });
    },

    confirmDeleteConsola(consolaId) {
      const confirmDelete = window.confirm("Quer mesmo eliminar esta Consola?");
      if (confirmDelete) {
        axios.delete(`http://localhost:3000/Consolas/${consolaId}`)
          .then(response => {
            console.log("Consola eliminada com sucesso:", response.data);
            // Toastr de sucesso
            toastr.success("Consola eliminada com sucesso. (Reiniciando a página em 5 segundos)", "Sucesso", {
                closeButton: true,
                positionClass: "toast-bottom-right",
                progressBar: true,
                timeOut: 5000,
                extendedTimeOut: 1000,
                preventDuplicates: true,
                showMethod: "fadeIn",
                hideMethod: "fadeOut",
                toastClass: "toast-success",
              });
              // f5 na pagina
              setTimeout(() => {
                location.reload();
              }, 5000);  
              
          })
          .catch(error => {
            console.error("Erro ao eliminar a Consola:", error);
            // Toastr Erro
            toastr.error("Erro ao eliminar a Consola.", "Erro!", {
            closeButton: true,
            positionClass: "toast-bottom-right",
            progressBar: true,
            timeOut: 5000,
            extendedTimeOut: 1000,
            preventDuplicates: true,
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
            toastClass: "toast-error",
          });
          });
      }
    },

    // ----------------------  Add ---------------------- 

    openAddModal(consola, currentConsolaId) {
      this.showAddModal = true;
      currentConsolaId = consola.id;
    },

    closeAddModal() {
      this.showAddModal = false;
    },

    addConsola() {
      // Verifica se a imagem inserida existe na pasta /public/img/catalogo/ImagensArtigos/
      axios.get(`/img/catalogo/ImagensArtigos/${this.novoConsola.imagem}`)
        .then(() => {
          // Se a imagem existe, continua com a adição da nova Consola
          // Realiza um POST para adicionar a nova Consola
          axios.post('http://localhost:3000/Consolas', this.novoConsola)
            .then(response => {
              console.log('Nova Consola adicionada com sucesso:', response.data);
              // Adiciona a nova consola à lista de itens exibidos na tabela
              this.items.push(response.data);
              this.closeAddModal();
              // Toastr de sucesso
              toastr.success('Consola adicionada com sucesso.', 'Sucesso', {
                closeButton: true,
                positionClass: 'toast-bottom-right',
                progressBar: true,
                timeOut: 5000,
                extendedTimeOut: 1000,
                preventDuplicates: true,
                showMethod: 'fadeIn',
                hideMethod: 'fadeOut',
                toastClass: 'toast-success',
              });
            })
            .catch(error => {
              console.error('Erro ao adicionar nova consola:', error);
              // Toastr de erro
              toastr.error('Erro ao adicionar a consola.', 'Erro!', {
                closeButton: true,
                positionClass: 'toast-bottom-right',
                progressBar: true,
                timeOut: 5000,
                extendedTimeOut: 1000,
                preventDuplicates: true,
                showMethod: 'fadeIn',
                hideMethod: 'fadeOut',
                toastClass: 'toast-error',
              });
            });
        })
        .catch(() => {
          // Se a imagem não existe, exibe o toastr de erro
          toastr.error('Adicione Primeiro A Imagem Na Pasta Correta (Imagens Artigos)', 'Erro!', {
            closeButton: true,
            positionClass: 'toast-bottom-right',
            progressBar: true,
            timeOut: 5000,
            extendedTimeOut: 1000,
            preventDuplicates: true,
            showMethod: 'fadeIn',
            hideMethod: 'fadeOut',
            toastClass: 'toast-error',
          });
        });
    },

    // ---------------------- Componentes ---------------------- 

    openComponenteModal(itemId) {
      const selectedConsola = this.items.find(item => item.id === itemId);
      if (selectedConsola) {
        this.selectedConsolaName = selectedConsola.nome;
        this.selectedConsolaComponents = selectedConsola.componentes || [];
        this.currentConsolaId = selectedConsola.id;
        $('#componentesModal').modal('show');
      }
    },

    closeComponenteModal() {
      $('#componentesModal').modal('hide');
    },

    // Add Componentes
    
    openAddComponenteModal() {
      // Verificar se currentConsolaId está definido
      if (this.currentConsolaId) {
        $('#addComponenteModal').modal('show');
      } else {
        console.error("ID da consola não definido.");
        // Toastr de erro
        toastr.error("ID da consola não definido. Por favor, selecione uma consola válida.", "Erro!", {
          closeButton: true,
          positionClass: "toast-bottom-right",
          progressBar: true,
          timeOut: 5000,
          extendedTimeOut: 1000,
          preventDuplicates: true,
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
          toastClass: "toast-error",
        });
      }
    },

    closeAddComponenteModal() {
      $('#addComponenteModal').modal('hide');
    },

    addComponenteConsola() {
      // Verificar se o ID do consola está definido
      if (this.currentConsolaId) {
        const selectedConsola = this.items.find(item => item.id === this.currentConsolaId);

        // Verificar se o consola foi encontrado
        if (selectedConsola) {
          // Verificar se o consola possui a propriedade 'componentes'
          if (!selectedConsola.hasOwnProperty('componentes')) {
            // Se não tiver, criar a propriedade 'componentes' como um array vazio
            selectedConsola.componentes = [];
          }

          // Verificar se a imagem inserida existe na pasta /public/img/catalogo/ImagensComponentes/
          axios.get(`/img/catalogo/ImagensComponentes/${this.novoComponenteConsola.imagem}`)
            .then(() => {
              // Se a imagem existe, continua com a adição do novo componente
              // Gerar o ID incremental para o novo componente
              const novoComponenteId = selectedConsola.componentes.length + 1;

              // Adicionar o novo componente ao array de componentes do consola com o ID gerado
              selectedConsola.componentes.push({
                id: novoComponenteId,
                nome: this.novoComponenteConsola.nome,
                dimensao: this.novoComponenteConsola.dimensao,
                precofixo: parseFloat(this.novoComponenteConsola.precofixo.toString().replace('€', '').trim()),
                imagem: this.novoComponenteConsola.imagem
              });

              // Limpar os campos do formulário após adicionar o componente
              this.novoComponenteConsola.nome = '';
              this.novoComponenteConsola.dimensao = '';
              this.novoComponenteConsola.precofixo = '';
              this.novoComponenteConsola.imagem = '';

              // Atualizar o consola no servidor
              axios.put(`http://localhost:3000/Consolas/${selectedConsola.id}`, selectedConsola)
                .then(response => {
                  console.log("Componente adicionado a consola com sucesso:", response.data);
                  // Fechar o modal de adição de componente
                  this.closeAddComponenteModal();
                  // Toastr de sucesso
                  toastr.success("Componente adicionado a consola com sucesso.", "Sucesso", {
                    closeButton: true,
                    positionClass: "toast-bottom-right",
                    progressBar: true,
                    timeOut: 5000,
                    extendedTimeOut: 1000,
                    preventDuplicates: true,
                    showMethod: "fadeIn",
                    hideMethod: "fadeOut",
                    toastClass: "toast-success",
                  });
                })
                .catch(error => {
                  console.error("Erro ao adicionar componente a consola:", error);
                  // Toastr de erro
                  toastr.error("Erro ao adicionar componente a consola.", "Erro!", {
                    closeButton: true,
                    positionClass: "toast-bottom-right",
                    progressBar: true,
                    timeOut: 5000,
                    extendedTimeOut: 1000,
                    preventDuplicates: true,
                    showMethod: "fadeIn",
                    hideMethod: "fadeOut",
                    toastClass: "toast-error",
                  });
                });
            })
            .catch(() => {
              // Se a imagem não existe, exibe o toastr de erro
              toastr.error('Adicione Primeiro A Imagem Na Pasta Correta (Imagens Componentes)', 'Erro!', {
                closeButton: true,
                positionClass: 'toast-bottom-right',
                progressBar: true,
                timeOut: 5000,
                extendedTimeOut: 1000,
                preventDuplicates: true,
                showMethod: 'fadeIn',
                hideMethod: 'fadeOut',
                toastClass: 'toast-error',
              });
            });
        } else {
          console.error("Consola não encontrado com o ID:", this.currentConsolaId);
          // Toastr de erro
          toastr.error("Consola não encontrada. Por favor, selecione uma consola válida.", "Erro!", {
            closeButton: true,
            positionClass: "toast-bottom-right",
            progressBar: true,
            timeOut: 5000,
            extendedTimeOut: 1000,
            preventDuplicates: true,
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
            toastClass: "toast-error",
          });
        }
      } else {
        console.error("ID da consola não definida.");
        // Toastr de erro
        toastr.error("ID da consola não definida. Por favor, abra a modal novamente.", "Erro!", {
          closeButton: true,
          positionClass: "toast-bottom-right",
          progressBar: true,
          timeOut: 5000,
          extendedTimeOut: 1000,
          preventDuplicates: true,
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
          toastClass: "toast-error",
        });
      }
    },

    // Botão Ver Imagem Componentes

    getItemNome(imagemSrcComponente) {
      const componente = this.selectedConsolaComponents.find(comp => `/img/Catalogo/ImagensComponentes/${comp.imagem}` === imagemSrcComponente);
      return componente ? componente.nome : 'Componente';
    },


    openImageModal(imagemSrcComponente, componentName) {
      const componente = this.selectedConsolaComponents.find(comp => {
        const lastIndexOfSlash = comp.imagem.lastIndexOf('/');
        const imageName = comp.imagem.substring(lastIndexOfSlash + 1);
        return imageName === imagemSrcComponente;
      });

      console.log("Componente encontrado:", componente);
      
      if (componente) {
        console.log("Nome do componente:", componente.nome);
        this.selectedComponenteName = componentName;
        this.imagemModalComponenteSrc = `/img/Catalogo/ImagensComponentes/${componente.imagem}`;
        $('#verImagemComponenteModal').modal('show');
      } else {
        console.error("Componente não encontrado para a imagem:", imagemSrcComponente);
        // Toastr de erro
        toastr.error("Componente não encontrado. Por favor, tente novamente.", "Erro!", {
          closeButton: true,
          positionClass: "toast-bottom-right",
          progressBar: true,
          timeOut: 5000,
          extendedTimeOut: 1000,
          preventDuplicates: true,
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
          toastClass: "toast-error",
        });
      }
    },


    closeImageModal() {
      $('#verImagemComponenteModal').modal('hide');
    },

    // Ações Componentes

    confirmDeleteComponente(componenteId) {
      const selectedConsola = this.items.find(item => item.id === this.currentConsolaId);

      if (selectedConsola) {
        if (selectedConsola.componentes && selectedConsola.componentes.some(componente => componente.id === componenteId)) {
          const confirmDelete = window.confirm("Quer mesmo eliminar este componente?");

          if (confirmDelete) {
            selectedConsola.componentes = selectedConsola.componentes.filter(componente => componente.id !== componenteId);

            axios.put(`http://localhost:3000/Consolas/${selectedConsola.id}`, selectedConsola)
              .then(response => {
                console.log("Componente removido da consola com sucesso:", response.data);
                toastr.success("Componente removido com sucesso. (Reiniciando a página em 5 segundos)", "Sucesso", {
                  closeButton: true,
                  positionClass: "toast-bottom-right",
                  progressBar: true,
                  timeOut: 5000,
                  extendedTimeOut: 1000,
                  preventDuplicates: true,
                  showMethod: "fadeIn",
                  hideMethod: "fadeOut",
                  toastClass: "toast-success",
                });
                // f5 na pagina
                setTimeout(() => {
                  location.reload();
                }, 5000);   
              })
              .catch(error => {
                console.error("Erro ao remover componente da consola:", error);
                toastr.error("Erro ao remover componente da consola.", "Erro!", {
                  closeButton: true,
                  positionClass: "toast-bottom-right",
                  progressBar: true,
                  timeOut: 5000,
                  extendedTimeOut: 1000,
                  preventDuplicates: true,
                  showMethod: "fadeIn",
                  hideMethod: "fadeOut",
                  toastClass: "toast-error",
                });
              });
          }
        } else {
          console.error("Componente não encontrado na lista de componentes.");
          toastr.error("Componente não encontrado na lista de componentes.", "Erro!", {
            closeButton: true,
            positionClass: "toast-bottom-right",
            progressBar: true,
            timeOut: 5000,
            extendedTimeOut: 1000,
            preventDuplicates: true,
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
            toastClass: "toast-error",
          });
        }
      } else {
        console.error("Consola não encontrada com o ID:", this.currentConsolaId);
        toastr.error("Consola não encontrada. Por favor, selecione uma consola válida.", "Erro!", {
          closeButton: true,
          positionClass: "toast-bottom-right",
          progressBar: true,
          timeOut: 5000,
          extendedTimeOut: 1000,
          preventDuplicates: true,
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
          toastClass: "toast-error",
        });
      }
    },

    openEditModalComponente(componenteId) {
      console.log("abriu edit");

      const selectedConsola = this.items.find(item => item.id === this.currentConsolaId);
      if (selectedConsola) {
        const selectedComponente = selectedConsola.componentes.find(componente => componente.id === componenteId);

        if (selectedComponente) {
          // Preencha os campos da modal de edição com os detalhes do componente selecionado
          this.editedComponente = { ...selectedComponente };

          $('#componentesModal').modal('hide');
          this.showEditModalComponente = true;

        } else {
          console.error("Componente não encontrado na lista de componentes.");
          toastr.error("Componente não encontrado na lista de componentes.", "Erro!", {
            closeButton: true,
            positionClass: "toast-bottom-right",
            progressBar: true,
            timeOut: 5000,
            extendedTimeOut: 1000,
            preventDuplicates: true,
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
            toastClass: "toast-error",
          });
        }
      } else {
        console.error("Consola não encontrada com o ID:", this.currentConsolaId);
        toastr.error("Consola não encontrada. Por favor, selecione uma consola válida.", "Erro!", {
          closeButton: true,
          positionClass: "toast-bottom-right",
          progressBar: true,
          timeOut: 5000,
          extendedTimeOut: 1000,
          preventDuplicates: true,
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
          toastClass: "toast-error",
        });
      }
    },

    closeEditModalComponente() {
      this.showEditModalComponente = false;
      this.editedComponente = {};
    },

    saveComponenteChanges() {
      const selectedConsola = this.items.find(item => item.id === this.currentConsolaId);

      if (selectedConsola) {
        const editedIndex = selectedConsola.componentes.findIndex(componente => componente.id === this.editedComponente.id);

        if (editedIndex !== -1) {
          // Verificar se a imagem existe na pasta /public/img/Catalogo/ImagensComponentes/
          axios.get(`/img/catalogo/ImagensComponentes/${this.editedComponente.imagem}`)
            .then(() => {
              // Se a imagem existe, atualize os detalhes do componente
              selectedConsola.componentes[editedIndex] = { ...this.editedComponente };

              // Chame a API para salvar as modificações
              axios.put(`http://localhost:3000/Consolas/${this.currentConsolaId}`, selectedConsola)
                .then(response => {
                  console.log("Componente da consola atualizado com sucesso:", response.data);
                  toastr.success("Componente atualizado com sucesso.", "Sucesso", {
                    closeButton: true,
                    positionClass: "toast-bottom-right",
                    progressBar: true,
                    timeOut: 5000,
                    extendedTimeOut: 1000,
                    preventDuplicates: true,
                    showMethod: "fadeIn",
                    hideMethod: "fadeOut",
                    toastClass: "toast-success",
                  });
                  this.closeEditModalComponente();
                  $('#componentesModal').modal('show');
                })
                .catch(error => {
                  console.error("Erro ao atualizar componente da consola:", error);
                  toastr.error("Erro ao atualizar componente da consola.", "Erro!", {
                    closeButton: true,
                    positionClass: "toast-bottom-right",
                    progressBar: true,
                    timeOut: 5000,
                    extendedTimeOut: 1000,
                    preventDuplicates: true,
                    showMethod: "fadeIn",
                    hideMethod: "fadeOut",
                    toastClass: "toast-error",
                  });
                });
            })
            .catch(() => {
              // Se a imagem não existe, exiba o toastr de erro
              console.error("Imagem do componente não encontrada:", this.editedComponente.imagem);
              toastr.error("Imagem do componente não encontrada. Por favor, adicione a imagem na pasta correta (Imagens Componentes).", "Erro!", {
                closeButton: true,
                positionClass: "toast-bottom-right",
                progressBar: true,
                timeOut: 5000,
                extendedTimeOut: 1000,
                preventDuplicates: true,
                showMethod: "fadeIn",
                hideMethod: "fadeOut",
                toastClass: "toast-error",
              });
            });
        } else {
          console.error("Componente não encontrado na lista de componentes.");
          toastr.error("Componente não encontrado na lista de componentes.", "Erro!", {
            closeButton: true,
            positionClass: "toast-bottom-right",
            progressBar: true,
            timeOut: 5000,
            extendedTimeOut: 1000,
            preventDuplicates: true,
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
            toastClass: "toast-error",
          });
        }
      } else {
        console.error("Consola não encontrada com o ID:", this.currentConsolaId);
        toastr.error("Consola não encontrada. Por favor, selecione uma consola válida.", "Erro!", {
          closeButton: true,
          positionClass: "toast-bottom-right",
          progressBar: true,
          timeOut: 5000,
          extendedTimeOut: 1000,
          preventDuplicates: true,
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
          toastClass: "toast-error",
        });
      }
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

    // ---------------------- Calcular Preço Total ---------------------- 

    calcularPrecoTotalComIVA() {
      // Iterar sobre cada sofá na lista
      this.items.forEach(consola => {
        // Inicializar o preço total com zero
        let precoTotalComIVA = 0;
        let precoTotalComIVAeLucro = 0;

        // Verificar se o sofá possui componentes
        if (consola.componentes && consola.componentes.length > 0) {
          // Iterar sobre cada componente do sofá
          consola.componentes.forEach(componente => {
            // Adicionar o preço do componente ao preço total com IVA
            precoTotalComIVA += componente.precofixo * 1.23; // 23% de IVA
            precoTotalComIVAeLucro += precoTotalComIVA * 1.50; // 50€ de lucro
            

            // Arredondar o preço total com IVA para duas casas decimais
            precoTotalComIVAeLucro = parseFloat(precoTotalComIVAeLucro.toFixed(2));
          });

          // Atualizar o campo 'preco' do sofá com o novo preço total com IVA
          consola.preco = precoTotalComIVAeLucro;

          // Fazer uma requisição PUT para atualizar o sofá no servidor
          axios.put(`http://localhost:3000/Consolas/${consola.id}`, consola)
            .then(response => {
              console.log("Preço total com IVA atualizado com sucesso para o sofá:", response.data);
            })
            .catch(error => {
              console.error("Erro ao atualizar o preço total com IVA para o sofá:", error);
            });
        } else {
          console.warn("O sofá", consola.nome, "não possui componentes.");
        }
      });
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
/* Botão que mexe com os outros */
.btn-MostrarTudo {
  margin-right: 8px;
  margin-left: 1270px; /* Casa: 1235px / Casa f11: 1270px / Escola: 1320px */
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

/* CamposConsolas */
.CamposConsolas {
    background-color: transparent;
    border: none;
    cursor: default;
    font-weight: bold;
    font-size: 18px;
}

/* Modal Ver Imagem */

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

/* botão Açoes */
.TextAcoes {
  text-align: center;
}

.table .TextAcoes button {
  margin-right: 5px;
}

.modal.show {
  display: block;
  animation: fadeIn 0.3s ease;
}

.corpo-modal-imagem-EditarConsola {
  display: flex;
  justify-content: center;
  align-items: center;
}

.corpo-modal-imagem-EditarConsola img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto; 
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Adicionar Consola */

.btn-add {
  margin-bottom: 3px;
  margin-left: 8px;
}

.modal-add {
  display: none;
  animation: fadeIn 0.3s ease;
}

.modal-add.show {
  display: block;
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

/* Tabela Componentes */

.table-Componentes {
  width: 1270px; /* Muda a dimensao da tabela toda */
  margin: 0 auto; 
  font-size: 18px;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 2);
}

.ImagensComponentes {
  cursor: pointer;
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

/* Modal Editar Componente Consola */

.modal-dialog-editarComponentes {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vh;
  margin: 0 auto;
}

.modal-content-editarComponentes {
  width: auto;
  max-width: 90%; 
  height: auto;
}
</style>
