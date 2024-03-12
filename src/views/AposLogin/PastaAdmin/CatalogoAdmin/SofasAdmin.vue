<template>
  <div class="main-container" style="background-color: #292727;">
    <NavbarAdmin :logo="logo_src" :alt="app_name" />
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

        <button class="btn btn-primary btn-add" @click="openAddModal">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>

        <!-- Modal ADD Sofá -->
        <div class="modal modal-add" id="modalAdd" :class="{ 'show': showAddModal }" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content" style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 60%; border-radius: 10px;">
              <div class="modal-header">
                <h5 class="modal-title"><b>Adicionar Sofá</b></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeAddModal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <!-- Campo Nome -->
                <div class="form-group">
                  <label for="nome">Nome:</label>
                  <input type="text" class="form-control" id="nome" v-model="novoSofa.nome" autocomplete="off">
                </div>
                <!-- Campo Tipo -->
                <div class="form-group">
                  <label for="tipo">Tipo:</label>
                  <input type="text" class="form-control" id="tipo" v-model="novoSofa.tipo" autocomplete="off">
                </div>
                <!-- Campo Material -->
                <div class="form-group">
                  <label for="material">Material:</label>
                  <input type="text" class="form-control" id="material" v-model="novoSofa.material" autocomplete="off">
                </div>
                <!-- Campo Preço -->
                <div class="form-group">
                  <label for="preco">Preço:</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">€</span>
                        </div>
                        <input type="number" class="form-control" id="preco" v-model="novoSofa.preco" autocomplete="off">
                    </div>
                </div>
                <!-- Campo Imagem -->
                <div class="form-group">
                    <label for="imagem">Imagem:</label>
                    <input type="text" class="form-control" id="imagem" v-model="novoSofa.imagem" @input="updateImage" autocomplete="off">
                </div>
                <!-- Exibição dinâmica da imagem -->
                <div class="corpo-modal-imagem" v-if="novoSofa.imagem">
                    <img :src="`/img/catalogo/ImagensArtigos/${novoSofa.imagem}`" alt="Imagem">
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn-lg btn-info" @click="addSofa">Adicionar</button>
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
      <th scope="col" v-if="columnVisibility.preco">
        <label class="CamposSofas">Preço</label>
      </th>
      <th scope="col" v-if="columnVisibility.imagem">
        <label class="CamposSofas">Imagem</label>
      </th>
      <th scope="col">
        <label class="CamposSofas">Componentes</label>
      </th>
      <th scope="col">
        <label class="CamposSofas">Ações</label>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in items" :key="index">
      <th scope="row">{{ item.id }}</th>
      <td v-if="columnVisibility.nome">{{ item.nome }}</td>
      <td v-if="columnVisibility.tipo">{{ item.tipo }}</td>
      <td v-if="columnVisibility.material">{{ item.material }}</td>
      <td v-if="columnVisibility.preco">{{ item.preco }}€</td>
      <td v-if="columnVisibility.imagem">
        <button class="btn btn-secondary" @click="verImagem(item.imagem, item.nome)">Ver Imagem</button>
      </td>
      <!-- Btn Componentes -->
      <td class="btnComponentes">
        <button class="btn btn-secondary" @click="openComponenteModal(item.id)">Ver Componentes</button>
      </td>

      <!-- Botões de edição e eliminar -->
      <td class="TextAcoes">
        <!-- Botão Editar -->
        <button class="btn btn-primary btn-sm" @click="openEditModal(item)" title="Editar Sofá">
          <FontAwesomeIcon :icon="['fas', 'pencil-alt']" />
        </button>
        <!-- Botão Remover -->
        <button class="btn btn-danger btn-sm" @click="confirmDeleteSofa(item.id)" title="Remover Sofá">
          <FontAwesomeIcon :icon="['fas', 'trash-alt']" />
        </button>
      </td>
    </tr>
  </tbody>
</table>

      <!-- Modal para editar Sofá -->
      <div class="modal" :class="{ 'show': showEditModal }" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content" style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 60%; border-radius: 10px;">
            <div class="modal-header">
              <h5 class="modal-title"><b>Editar Sofá</b></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeEditModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" >
              <form class="user-form">
                <div class="mb-3" style="font-family: Verdana;">
                  <input type="text" class="form-control" placeholder="Novo Nome" v-model="editedSofa.nome">
                </div>
                <div class="mb-3" style="font-family: Verdana;">
                  <input type="text" class="form-control" placeholder="Novo Tipo" v-model="editedSofa.tipo">
                </div>
                <div class="mb-3" style="font-family: Verdana;">
                  <input type="text" class="form-control" placeholder="Novo Material" v-model="editedSofa.material">
                </div>
                <div class="mb-3" style="font-family: Verdana;">
                  <div class="input-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text">€</span>
                      </div>
                      <input type="number" class="form-control" placeholder="Novo Preço" v-model="editedSofa.preco">
                  </div>
                </div>
                
                <div class="mb-3" style="font-family: Verdana;">
                  <input type="text" class="form-control" placeholder="Nova imagem" v-model="editedSofa.imagem">
                </div>

                <div class="mb-3 corpo-modal-imagem-EditarSofa" v-if="editedSofa.imagem" style="font-family: Verdana;">
                    <img :src="`/img/catalogo/ImagensArtigos/${editedSofa.imagem}`" alt="Imagem">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn-lg btn-info" @click="saveSofaChanges">Salvar Modificações</button>
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
      <div class="modal fade" id="componentesModal" tabindex="-1" role="dialog" aria-labelledby="componentesModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-componentes" role="document">
          <div class="modal-content modal-content-componentes">
            <div class="modal-header">
              <h5 class="modal-title" id="componentesModalLabel"><b>Componentes - {{ selectedSofaName }}</b></h5>
              <!-- Botão Abrir Modal Add Componente -->
              <button class="btn btn-primary btn-sm" @click="openAddComponenteModal" title="Adicionar Componente" style="margin-left: 529px;">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </button>

              <button @click="closeComponenteModal" type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body modal-body-componentes">
              <table class="table table-Componentes">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Preço Fixo</th>
                    <th>Dimensão</th>
                    <th>Imagem</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(componente, id) in selectedSofaComponents" :key="id">
                    <td>{{ id + 1 }}</td>
                    <td>{{ componente.nome }}</td>
                    <td>{{ componente.precofixo }}</td>
                    <td>{{ componente.dimensao }}</td>
                    <td @click="openImageModal(componente.imagem)" class="ImagensComponentes">
                      {{ componente.imagem }}
                    </td>

                    <!-- Botões Ações Componentes -->
                    <td class="TextAcoes">

                      <!-- Botão Remover Componente -->
                      <button class="btn btn-danger btn-sm" @click="confirmDeleteComponente(componente.id)" title="Remover Componente">
                        <FontAwesomeIcon :icon="['fas', 'trash-alt']" />
                      </button>

                      <!-- Botão Editar Componente -->
                      <button class="btn btn-primary btn-sm" @click="openEditModalComponente(componente)" title="Editar Componente">
                        <FontAwesomeIcon :icon="['fas', 'pencil-alt']" />
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
              <h5 class="modal-title" id="verImagemComponenteModalLabel"><b>Componente - {{ selectedComponenteName }}</b></h5>
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

      <!-- Modal Add Componente Sofá -->
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
                  <input type="text" class="form-control" id="nome" v-model="novoComponenteSofa.nome" autocomplete="off">
                </div>
                <!-- Campo Dimensão -->
                <div class="form-group">
                  <label for="dimensao">Dimensão:</label>
                  <input type="text" class="form-control" id="dimensao" v-model="novoComponenteSofa.dimensao" autocomplete="off">
                </div>
                <!-- Campo Preço Fixo-->
                <div class="form-group">
                  <label for="precofixo">Preço Fixo:</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">€</span>
                        </div>
                        <input type="number" class="form-control" id="precofixo" v-model="novoComponenteSofa.precofixo" autocomplete="off">
                    </div>
                </div>
                <!-- Campo Imagem -->
                <div class="form-group">
                    <label for="imagem">Imagem:</label>
                    <input type="text" class="form-control" id="imagem" v-model="novoComponenteSofa.imagem" @input="updateImage" autocomplete="off">
                </div>

                <!-- Exibição dinâmica da imagem -->
                <div class="corpo-modal-imagem" v-if="novoComponenteSofa.imagem">
                    <img :src="`/img/Catalogo/ImagensComponentes/${novoComponenteSofa.imagem}`" alt="Imagem">
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn-lg btn-info" @click="addComponenteSofa">Adicionar</button>
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
  name: "SofasAdmin",

  components: {
    NavbarAdmin,
    FontAwesomeIcon,
  },

  data() {
    return  { 
      logo_src: "/img/logo.png",
      app_name: "Espaços Miranda",
      userId: null,
      imagemModalSrc: '',
      imagemModalComponenteSrc: '',
      imagemModalNome: '',
      showEditModal: false,
      showAddModal: false,
      showComponenteAddModal: false,
      selectedSofaName: '',
      selectedComponenteName: '',
      selectedSofaComponents: [],
      currentSofaId: null,
      editedSofa: {},
      columnVisibility: {
        nome: true,
        tipo: true,
        material: true,
        preco: true,
        imagem: true,
      },
      // Adicionar
      novoSofa: {
        nome: '',
        tipo: '',
        material: '',
        preco: null,
        imagem: ''
      },
      // Componentes
      novoComponenteSofa: {
        nome: '',
        dimensao: '',
        precofixo: '',
        imagem: ''
      },
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

    // ----------------------  Ações ---------------------- 

    openEditModal(item) {
      this.showEditModal = true;
      this.editedSofa = { ...item };
    },

    closeEditModal() {
      this.showEditModal = false;
    },

    saveSofaChanges() {
    // Verifica se a imagem inserida existe na pasta /public/img/catalogo/ImagensArtigos/
    axios.get(`/img/catalogo/ImagensArtigos/${this.editedSofa.imagem}`)
      .then(() => {
        // Se a imagem existe, continua com a atualização do sofá
        this.editedSofa.preco = parseFloat(this.editedSofa.preco.toString().replace('€', '').trim());
        const SofaIdToUpdate = this.editedSofa.id;
        const updatedData = {
          nome: this.editedSofa.nome,
          material: this.editedSofa.material,
          tipo: this.editedSofa.tipo,
          preco: this.editedSofa.preco,
          imagem: this.editedSofa.imagem,
        };

        axios.put(`http://localhost:3000/Sofas/${SofaIdToUpdate}`, updatedData)
          .then(response => {
            console.log("Dados do sofá atualizados com sucesso:", response.data);
            // Toastr de sucesso
            toastr.success("Sofá Editado com sucesso. (Reiniciando a página em 5 segundos)", "Sucesso", {
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
            console.error("Erro ao atualizar dados do Sofa:", error);
            // Toastr de erro
            toastr.error("Erro ao editar o Sofa.", "Erro!", {
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

    confirmDeleteSofa(sofaId) {
      const confirmDelete = window.confirm("Quer mesmo eliminar este Sofa?");
      if (confirmDelete) {
        axios.delete(`http://localhost:3000/Sofas/${sofaId}`)
          .then(response => {
            console.log("Sofá eliminado com sucesso:", response.data);
            // Toastr de sucesso
            toastr.success("Sofá eliminada com sucesso. (Reiniciando a página em 5 segundos)", "Sucesso", {
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
            console.error("Erro ao eliminar o Sofá:", error);
            // Toastr Erro
            toastr.error("Erro ao eliminar o Sofá.", "Erro!", {
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

    openAddModal(sofa, currentSofaId) {
      this.showAddModal = true;
      currentSofaId = sofa.id;
    },

    closeAddModal() {
      this.showAddModal = false;
    },

    addSofa() {
      this.novoSofa.preco = parseFloat(this.novoSofa.preco.toString().replace('€', '').trim());

      // Verifica se a imagem inserida existe na pasta /public/img/catalogo/ImagensArtigos/
      axios.get(`/img/catalogo/ImagensArtigos/${this.novoSofa.imagem}`)
        .then(() => {
          // Se a imagem existe, continua com a adição do novo sofá
          // Realiza um POST para adicionar o novo sofá
          axios.post('http://localhost:3000/Sofas', this.novoSofa)
            .then(response => {
              console.log('Novo sofá adicionado com sucesso:', response.data);
              // Adiciona o novo sofá à lista de itens exibidos na tabela
              this.items.push(response.data);
              this.closeAddModal();
              // Toastr de sucesso
              toastr.success('Sofá adicionado com sucesso.', 'Sucesso', {
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
              console.error('Erro ao adicionar novo sofá:', error);
              // Toastr de erro
              toastr.error('Erro ao adicionar o sofá.', 'Erro!', {
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
      const selectedSofa = this.items.find(item => item.id === itemId);
      if (selectedSofa) {
        this.selectedSofaName = selectedSofa.nome;
        this.selectedSofaComponents = selectedSofa.componentes || [];
        this.currentSofaId = selectedSofa.id;
        $('#componentesModal').modal('show');
      }
    },

    closeComponenteModal() {
      $('#componentesModal').modal('hide');
    },

    // Add Componentes
    
    openAddComponenteModal() {
      // Verificar se currentSofaId está definido
      if (this.currentSofaId) {
        $('#addComponenteModal').modal('show');
      } else {
        console.error("ID do sofá não definido.");
        // Toastr de erro
        toastr.error("ID do sofá não definido. Por favor, selecione um sofá válido.", "Erro!", {
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

    addComponenteSofa() {
      // Verificar se o ID do sofá está definido
      if (this.currentSofaId) {
        const selectedSofa = this.items.find(item => item.id === this.currentSofaId);

        // Verificar se o sofá foi encontrado
        if (selectedSofa) {
          // Verificar se o sofá possui a propriedade 'componentes'
          if (!selectedSofa.hasOwnProperty('componentes')) {
            // Se não tiver, criar a propriedade 'componentes' como um array vazio
            selectedSofa.componentes = [];
          }

          // Adicionar o novo componente ao array de componentes do sofá
          selectedSofa.componentes.push({
            nome: this.novoComponenteSofa.nome,
            dimensao: this.novoComponenteSofa.dimensao,
            precofixo: parseFloat(this.novoComponenteSofa.precofixo.toString().replace('€', '').trim()),
            imagem: this.novoComponenteSofa.imagem
          });

          // Limpar os campos do formulário após adicionar o componente
          this.novoComponenteSofa.nome = '';
          this.novoComponenteSofa.dimensao = '';
          this.novoComponenteSofa.precofixo = '';
          this.novoComponenteSofa.imagem = '';

          // Atualizar o sofá no servidor
          axios.put(`http://localhost:3000/Sofas/${selectedSofa.id}`, selectedSofa)
            .then(response => {
              console.log("Componente adicionado ao sofá com sucesso:", response.data);
              // Fechar o modal de adição de componente
              this.closeAddComponenteModal();
              // Toastr de sucesso
              toastr.success("Componente adicionado ao sofá com sucesso.", "Sucesso", {
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
              console.error("Erro ao adicionar componente ao sofá:", error);
              // Toastr de erro
              toastr.error("Erro ao adicionar componente ao sofá.", "Erro!", {
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
          console.error("Sofá não encontrado com o ID:", this.currentSofaId);
          // Toastr de erro
          toastr.error("Sofá não encontrado. Por favor, selecione um sofá válido.", "Erro!", {
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
        console.error("ID do sofá não definido.");
        // Toastr de erro
        toastr.error("ID do sofá não definido. Por favor, abra a modal novamente.", "Erro!", {
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
      const componente = this.selectedSofaComponents.find(comp => `/img/Catalogo/ImagensComponentes/${comp.imagem}` === imagemSrcComponente);
      return componente ? componente.nome : 'Componente';
    },


    openImageModal(imagemSrcComponente) {
      const componente = this.selectedSofaComponents.find(comp => {
        const lastIndexOfSlash = comp.imagem.lastIndexOf('/');
        const imageName = comp.imagem.substring(lastIndexOfSlash + 1);
        return imageName === imagemSrcComponente;
      });

      console.log("Componente encontrado:", componente);
      
      if (componente) {
        console.log("Nome do componente:", componente.nome);
        this.selectedComponenteName = componente.nome;
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
      const confirmDelete = window.confirm("Quer mesmo eliminar este Componente?");
      if (confirmDelete) {
        axios.delete(`http://localhost:3000/Sofas/componentes/${componenteId}`)
          .then(response => {
            console.log("Componente eliminado com sucesso:", response.data);
            // Toastr de sucesso
            toastr.success("Componente eliminado com sucesso. (Reiniciando a página em 5 segundos)", "Sucesso", {
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
            console.error("Erro ao eliminar o Componente:", error);
            // Toastr Erro
            toastr.error("Erro ao eliminar o Componente.", "Erro!", {
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

/* DropDown-Filtro */
/* Botão que mexe com os outros */
.btn-MostrarTudo {
  margin-right: 8px;
  margin-left: 1235px;
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

.corpo-modal-imagem-EditarSofa {
  display: flex;
  justify-content: center;
  align-items: center;
}

.corpo-modal-imagem-EditarSofa img {
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

/* Adicionar Sofás */

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
</style>