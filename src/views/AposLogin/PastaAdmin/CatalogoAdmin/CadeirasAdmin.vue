<template>
  <div class="main-container" style="background-color: #292727;">
    <NavbarAdmin :logo="logo_src" :alt="app_name" />
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

        <button class="btn btn-primary btn-add" @click="openAddModal">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>

        <!-- Modal ADD Cadeirão -->
        <div class="modal modal-add" id="modalAdd" :class="{ 'show': showAddModal }" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content" style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 60%; border-radius: 10px;">
              <div class="modal-header">
                <h5 class="modal-title"><b>Adicionar Cadeira</b></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeAddModal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <!-- Campo Nome -->
                <div class="form-group">
                  <label for="nome">Nome:</label>
                  <input type="text" class="form-control" id="nome" v-model="novoCadeira.nome" autocomplete="off">
                </div>
                <!-- Campo Material -->
                <div class="form-group">
                  <label for="material">Material:</label>
                  <input type="text" class="form-control" id="material" v-model="novoCadeira.material" autocomplete="off">
                </div>
                <!-- Campo Dimensão -->
                <div class="form-group">
                  <label for="dimensao">Dimensão:</label>
                  <input type="text" class="form-control" id="dimensao" v-model="novoCadeira.dimensao" autocomplete="off">
                </div>
                <!-- Campo Preço -->
                <div class="form-group">
                  <label for="preco">Preço:</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">€</span>
                        </div>
                        <input type="number" class="form-control" id="preco" v-model="novoCadeira.preco" autocomplete="off">
                    </div>
                </div>
                <!-- Campo Imagem -->
                <div class="form-group">
                    <label for="imagem">Imagem:</label>
                    <input type="text" class="form-control" id="imagem" v-model="novoCadeira.imagem" @input="updateImage" autocomplete="off">
                </div>
                <!-- Exibição dinâmica da imagem -->
                <div class="corpo-modal-imagem" v-if="novoCadeira.imagem">
                    <img :src="`/img/catalogo/ImagensArtigos/${novoCadeira.imagem}`" alt="Imagem">
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn-lg btn-info" @click="addCadeira">Adicionar</button>
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

    <!-- Tabela Informação Cadeiras -->
    <table class="table table-striped table-hover">
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
            <label class="CamposSofas">Dimensão</label>
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
          <th scope="col" v-if="columnVisibility.acoes">
            <label class="CamposSofas">Ações</label>
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
            <button class="btn btn-primary btn-sm" @click="openEditModal(item)" title="Editar Cadeira">
              <FontAwesomeIcon :icon="['fas', 'pencil-alt']" />
            </button>
            <!-- Botão Remover -->
            <button class="btn btn-danger btn-sm" @click="confirmDeleteCadeira(item.id)" title="Remover Cadeira">
              <FontAwesomeIcon :icon="['fas', 'trash-alt']" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para editar Cadeira -->
    <div class="modal" :class="{ 'show': showEditModal }" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content" style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 60%; border-radius: 10px;">
          <div class="modal-header">
            <h5 class="modal-title"><b>Editar Cadeira</b></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeEditModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" >
            <form class="user-form">
              <div class="mb-3" style="font-family: Verdana;">
                <input type="text" class="form-control" placeholder="Novo Nome" v-model="editedCadeira.nome">
              </div>
              <div class="mb-3" style="font-family: Verdana;">
                <input type="text" class="form-control" placeholder="Novo Material" v-model="editedCadeira.material">
              </div>
              <div class="mb-3" style="font-family: Verdana;">
                <input type="text" class="form-control" placeholder="Nova Dimensão" v-model="editedCadeira.dimensao">
              </div>
              <div class="mb-3" style="font-family: Verdana;">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">€</span>
                    </div>
                    <input type="number" class="form-control" placeholder="Novo Preço" v-model="editedCadeira.preco">
                </div>
              </div>
              
              <div class="mb-3" style="font-family: Verdana;">
                <input type="text" class="form-control" placeholder="Nova imagem" v-model="editedCadeira.imagem">
              </div>

              <div class="mb-3 corpo-modal-imagem-EditarCadeira" v-if="editedCadeira.imagem" style="font-family: Verdana;">
                  <img :src="`/img/catalogo/ImagensArtigos/${editedCadeira.imagem}`" alt="Imagem">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn-lg btn-info" @click="saveCadeiraChanges">Salvar Modificações</button>
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
            <h5 class="modal-title" id="componentesModalLabel"><b>{{ selectedCadeiraName }}</b></h5>
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
                <tr v-for="(componente, id) in selectedCadeiraComponents" :key="id">
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

    <!-- Modal Add Componente Cadeira -->
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
                <input type="text" class="form-control" id="nome" v-model="novoComponenteCadeira.nome" autocomplete="off">
              </div>
              <!-- Campo Dimensão -->
              <div class="form-group">
                <label for="dimensao">Dimensão:</label>
                <input type="text" class="form-control" id="dimensao" v-model="novoComponenteCadeira.dimensao" autocomplete="off">
              </div>
              <!-- Campo Preço Fixo-->
              <div class="form-group">
                <label for="precofixo">Preço Fixo:</label>
                  <div class="input-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text">€</span>
                      </div>
                      <input type="number" class="form-control" id="precofixo" v-model="novoComponenteCadeira.precofixo" autocomplete="off">
                  </div>
              </div>
              <!-- Campo Imagem -->
              <div class="form-group">
                  <label for="imagem">Imagem:</label>
                  <input type="text" class="form-control" id="imagem" v-model="novoComponenteCadeira.imagem" @input="updateImage" autocomplete="off">
              </div>

              <!-- Exibição dinâmica da imagem -->
              <div class="corpo-modal-imagem" v-if="novoComponenteCadeira.imagem">
                  <img :src="`/img/Catalogo/ImagensComponentes/${novoComponenteCadeira.imagem}`" alt="Imagem">
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-lg btn-info" @click="addComponenteCadeira">Adicionar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Editar Componente Mesa -->
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
                  <img :src="`/img/catalogo/ImagensArtigos/${editedComponente.imagem}`" alt="Imagem">
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
  name: "CadeirasAdmin",

  components: {
    NavbarAdmin,
    FontAwesomeIcon,
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
      // Sofas / Componentes
      selectedCadeiraName: '',
      selectedComponenteName: '',
      currentCadeiraId: null,
      editedCadeira: {},
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
      novoCadeira: {
        nome: '',
        dimensao: '',
        material: '',
        preco: null,
        imagem: ''
      },
      // Componentes
      novoComponenteCadeira: {
        nome: '',
        dimensao: '',
        precofixo: '',
        imagem: ''
      },
      // Imagens
      BannerCadeiras: "/img/Catalogo/BannersCatalogo/BannerCadeiras.jpg",
      // Dados na Tabela
      items: [],
      selectedCadeiraComponents: [],
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
      this.editedCadeira = { ...item };
    },

    closeEditModal() {
      this.showEditModal = false;
    },

    saveCadeiraChanges() {
    // Verifica se a imagem inserida existe na pasta /public/img/catalogo/ImagensArtigos/
    axios.get(`/img/catalogo/ImagensArtigos/${this.editedCadeira.imagem}`)
      .then(() => {
        // Se a imagem existe, continua com a atualização da Cadeira
        this.editedCadeira.preco = parseFloat(this.editedCadeira.preco.toString().replace('€', '').trim());
        const CadeiraIdToUpdate = this.editedCadeira.id;
        const updatedData = {
          nome: this.editedCadeira.nome,
          material: this.editedCadeira.material,
          dimensao: this.editedCadeira.dimensao,
          preco: this.editedCadeira.preco,
          imagem: this.editedCadeira.imagem,
        };

        axios.put(`http://localhost:3000/Cadeiras/${CadeiraIdToUpdate}`, updatedData)
          .then(response => {
            console.log("Dados da Cadeira atualizados com sucesso:", response.data);
            // Toastr de sucesso
            toastr.success("Cadeira Editada com sucesso. (Reiniciando a página em 5 segundos)", "Sucesso", {
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
            console.error("Erro ao atualizar dados da Cadeira:", error);
            // Toastr de erro
            toastr.error("Erro ao editar a Cadeira.", "Erro!", {
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

    confirmDeleteCadeira(cadeiraId) {
      const confirmDelete = window.confirm("Quer mesmo eliminar esta Cadeira?");
      if (confirmDelete) {
        axios.delete(`http://localhost:3000/Cadeiras/${cadeiraId}`)
          .then(response => {
            console.log("Cadeira eliminado com sucesso:", response.data);
            // Toastr de sucesso
            toastr.success("Cadeira eliminada com sucesso. (Reiniciando a página em 5 segundos)", "Sucesso", {
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
            console.error("Erro ao eliminar a Cadeira:", error);
            // Toastr Erro
            toastr.error("Erro ao eliminar a Cadeira.", "Erro!", {
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

    openAddModal(cadeira, currentCadeiraId) {
      this.showAddModal = true;
      currentCadeiraId = cadeira.id;
    },

    closeAddModal() {
      this.showAddModal = false;
    },

    addCadeira() {
      this.novoCadeira.preco = parseFloat(this.novoCadeira.preco.toString().replace('€', '').trim());

      // Verifica se a imagem inserida existe na pasta /public/img/catalogo/ImagensArtigos/
      axios.get(`/img/catalogo/ImagensArtigos/${this.novoCadeira.imagem}`)
        .then(() => {
          // Se a imagem existe, continua com a adição da nova cadeira
          // Realiza um POST para adicionar a nova cadeira
          axios.post('http://localhost:3000/Cadeiras', this.novoCadeira)
            .then(response => {
              console.log('Nova Cadeira adicionado com sucesso:', response.data);
              // Adiciona a nova Cadeira à lista de itens exibidos na tabela
              this.items.push(response.data);
              this.closeAddModal();
              // Toastr de sucesso
              toastr.success('Cadeira adicionado com sucesso.', 'Sucesso', {
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
              console.error('Erro ao adicionar nova Cadeira:', error);
              // Toastr de erro
              toastr.error('Erro ao adicionar a Cadeira.', 'Erro!', {
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
      const selectedCadeira = this.items.find(item => item.id === itemId);
      if (selectedCadeira) {
        this.selectedCadeiraName = selectedCadeira.nome;
        this.selectedCadeiraComponents = selectedCadeira.componentes || [];
        this.currentCadeiraId = selectedCadeira.id;
        $('#componentesModal').modal('show');
      }
    },

    closeComponenteModal() {
      $('#componentesModal').modal('hide');
    },

    // Add Componentes
    
    openAddComponenteModal() {
      // Verificar se currentCadeiraId está definido
      if (this.currentCadeiraId) {
        $('#addComponenteModal').modal('show');
      } else {
        console.error("ID da cadeira não definido.");
        // Toastr de erro
        toastr.error("ID da cadeira não definido. Por favor, selecione uma cadeira válida.", "Erro!", {
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

    addComponenteCadeira() {
      // Verificar se o ID do cadeira está definido
      if (this.currentCadeiraId) {
        const selectedCadeira = this.items.find(item => item.id === this.currentCadeiraId);

        // Verificar se o cadeira foi encontrado
        if (selectedCadeira) {
          // Verificar se o cadeira possui a propriedade 'componentes'
          if (!selectedCadeira.hasOwnProperty('componentes')) {
            // Se não tiver, criar a propriedade 'componentes' como um array vazio
            selectedCadeira.componentes = [];
          }

          // Verificar se a imagem inserida existe na pasta /public/img/catalogo/ImagensComponentes/
          axios.get(`/img/catalogo/ImagensComponentes/${this.novoComponenteCadeira.imagem}`)
            .then(() => {
              // Se a imagem existe, continua com a adição do novo componente
              // Gerar o ID incremental para o novo componente
              const novoComponenteId = selectedCadeira.componentes.length + 1;

              // Adicionar o novo componente ao array de componentes do cadeira com o ID gerado
              selectedCadeira.componentes.push({
                id: novoComponenteId,
                nome: this.novoComponenteCadeira.nome,
                dimensao: this.novoComponenteCadeira.dimensao,
                precofixo: parseFloat(this.novoComponenteCadeira.precofixo.toString().replace('€', '').trim()),
                imagem: this.novoComponenteCadeira.imagem
              });

              // Limpar os campos do formulário após adicionar o componente
              this.novoComponenteCadeira.nome = '';
              this.novoComponenteCadeira.dimensao = '';
              this.novoComponenteCadeira.precofixo = '';
              this.novoComponenteCadeira.imagem = '';

              // Atualizar o Cadeira no servidor
              axios.put(`http://localhost:3000/Cadeiras/${selectedCadeira.id}`, selectedCadeira)
                .then(response => {
                  console.log("Componente adicionado a cadeira com sucesso:", response.data);
                  // Fechar o modal de adição de componente
                  this.closeAddComponenteModal();
                  // Toastr de sucesso
                  toastr.success("Componente adicionado a cadeira com sucesso.", "Sucesso", {
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
                  console.error("Erro ao adicionar componente a cadeira:", error);
                  // Toastr de erro
                  toastr.error("Erro ao adicionar componente a cadeira.", "Erro!", {
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
          console.error("Cadeira não encontrado com o ID:", this.currentCadeiraId);
          // Toastr de erro
          toastr.error("Cadeira não encontrada. Por favor, selecione uma cadeira válida.", "Erro!", {
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
        console.error("ID da cadeira não definida.");
        // Toastr de erro
        toastr.error("ID da cadeira não definida. Por favor, abra a modal novamente.", "Erro!", {
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
      const componente = this.selectedCadeiraComponents.find(comp => `/img/Catalogo/ImagensComponentes/${comp.imagem}` === imagemSrcComponente);
      return componente ? componente.nome : 'Componente';
    },


    openImageModal(imagemSrcComponente, componentName) {
      const componente = this.selectedCadeiraComponents.find(comp => {
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
      const selectedCadeira = this.items.find(item => item.id === this.currentCadeiraId);

      if (selectedCadeira) {
        if (selectedCadeira.componentes && selectedCadeira.componentes.some(componente => componente.id === componenteId)) {
          const confirmDelete = window.confirm("Quer mesmo eliminar este componente?");

          if (confirmDelete) {
            selectedCadeira.componentes = selectedCadeira.componentes.filter(componente => componente.id !== componenteId);

            axios.put(`http://localhost:3000/Cadeiras/${selectedCadeira.id}`, selectedCadeira)
              .then(response => {
                console.log("Componente removido da cadeira com sucesso:", response.data);
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
                console.error("Erro ao remover componente da cadeira:", error);
                toastr.error("Erro ao remover componente da cadeira.", "Erro!", {
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
        console.error("Cadeira não encontrada com o ID:", this.currentCadeiraId);
        toastr.error("Cadeira não encontrada. Por favor, selecione uma cadeira válida.", "Erro!", {
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
      // console.log("abriu edit");

      const selectedCadeira = this.items.find(item => item.id === this.currentCadeiraId);
      if (selectedCadeira) {
        const selectedComponente = selectedCadeira.componentes.find(componente => componente.id === componenteId);

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
        console.error("Cadeira não encontrada com o ID:", this.currentCadeiraId);
        toastr.error("Cadeira não encontrada. Por favor, selecione uma cadeira válida.", "Erro!", {
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
      const selectedCadeira = this.items.find(item => item.id === this.currentCadeiraId);

      if (selectedCadeira) {
        const editedIndex = selectedCadeira.componentes.findIndex(componente => componente.id === this.editedComponente.id);

        if (editedIndex !== -1) {
          // Verificar se a imagem existe na pasta /public/img/Catalogo/ImagensComponentes/
          axios.get(`/img/catalogo/ImagensComponentes/${this.editedComponente.imagem}`)
            .then(() => {
              // Se a imagem existe, atualize os detalhes do componente
              selectedCadeira.componentes[editedIndex] = { ...this.editedComponente };

              // Chame a API para salvar as modificações
              axios.put(`http://localhost:3000/Cadeiras/${this.currentCadeiraId}`, selectedCadeira)
                .then(response => {
                  console.log("Componente da cadeira atualizado com sucesso:", response.data);
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
                  console.error("Erro ao atualizar componente da cadeira:", error);
                  toastr.error("Erro ao atualizar componente da cadeira.", "Erro!", {
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
        console.error("Cadeira não encontrada com o ID:", this.currentCadeiraId);
        toastr.error("Cadeira não encontrada. Por favor, selecione uma cadeira válida.", "Erro!", {
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
  margin-left: 1320px; /* Casa: 1235px / Escola: 1320px */
  margin-bottom: 3px;
}

/* Btn-FiltrarCampos */

.dropdown-toggle { 
  margin-bottom: 3px;
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

.corpo-modal-imagem-EditarCadeira {
  display: flex;
  justify-content: center;
  align-items: center;
}

.corpo-modal-imagem-EditarCadeira img {
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

/* Adicionar Cadeira */

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

/* Modal Editar Componente Cadeira */

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