<template>
  <div class="main-container" style="background-color: #292727; text-align: center;">
    <NavbarAdmin :logo="logo_src" :alt="app_name" />

    <button @click="openModal" class="btn-lg btn-custom">Sua Conta</button>

    <!-- Modal -->
    <div class="modal" :class="{ 'show': showModal }" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><b>Sua Conta</b></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="user-form" style="text-align: center; margin: 0 auto; max-width: 500px;">
              <div class="mb-3" style="font-family:Verdana">
                <!-- Email -->
                <input type="text" class="form-control" id="email" placeholder="Seu Email" v-model="editedData.email" autocomplete="off" :readonly="!isEditing">
              </div>

              <div style="margin: 2px;"></div>

              <div class="mb-3" style="font-family:Verdana">
                <!-- Utilizador -->
                <input type="text" class="form-control" id="username" placeholder="Seu Nome de Utilizador" v-model="editedData.username" autocomplete="off" :readonly="!isEditing">
              </div>

              <div style="margin: 2px;"></div>

              <!-- Password -->
              <div class="mb-3" style="font-family:Verdana">
                <div class="password-container" style="position: relative;">
                  <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" placeholder="Sua Password" v-model="editedData.password" autocomplete="off" :readonly="!isEditing">
                  <span class="eye-icon" @click="togglePasswordVisibility" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%);">&#128065;</span>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn-lg btn-info" @click="toggleEditMode">{{ isEditing ? 'Salvar Modificações' : 'Editar Conta' }}</button>
            <button class="btn-lg btn-danger" @click="confirmDelete">Eliminar Conta</button>
          </div>
        </div>
      </div>
    </div>

    <h1 class="TitleUsers">Utilizadores</h1>

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
          <input type="checkbox" v-model="columnVisibility.email" class="custom-checkbox" />
          Email
        </label>
        <label class="dropdown-item" @click="handleItemClick">
          <input type="checkbox" v-model="columnVisibility.username" class="custom-checkbox" />
          Nome de Utilizador
        </label>
        <label class="dropdown-item" @click="handleItemClick">
          <input type="checkbox" v-model="columnVisibility.password" class="custom-checkbox" />
          Password
        </label>
      </div>
    </div>

    <!-- Tabela de utilizador -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th v-if="columnVisibility.email">Email</th>
          <th v-if="columnVisibility.username">Nome de Utilizador</th>
          <th v-if="columnVisibility.password">Password</th>
          <th class="TextAcoes">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td v-if="columnVisibility.email">{{ user.email }}</td>
          <td v-if="columnVisibility.username">{{ user.username }}</td>
          <td v-if="columnVisibility.password">{{ user.password }}</td>
          <td class="TextAcoes">
            <button class="btn btn-primary btn-sm" @click="openEditModal(user)">
              <FontAwesomeIcon :icon="['fas', 'pencil-alt']" />
            </button>

            <button class="btn btn-danger btn-sm" @click="confirmDeleteUser(user.id)">
              <FontAwesomeIcon :icon="['fas', 'trash-alt']" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para editar Utilizador -->
    <div class="modal" :class="{ 'show': showEditModal }" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><b>Editar Utilizador</b></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeEditModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="user-form" style="text-align: center; margin: 0 auto; max-width: 500px;">
              <div class="mb-3" style="font-family: Verdana;">
                <input type="text" class="form-control" placeholder="Novo Email" v-model="editedUser.email">
              </div>
              <div class="mb-3" style="font-family: Verdana;">
                <input type="text" class="form-control" placeholder="Novo Nome de Utilizador" v-model="editedUser.username">
              </div>
              <div class="mb-3" style="font-family: Verdana; position: relative;">
                <input type="password" class="form-control" placeholder="Nova Password" id="passwordUser" v-model="editedUser.password">
                <span class="eye-icon" @click="togglePasswordVisibilityEditarUser" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%);">&#128065;</span>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn-lg btn-info" @click="saveUserChanges">Salvar Modificações</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import NavbarAdmin from '../../../components/ComponentsAposLogin/NavbarAdmin.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: "Definicoes",

  components: {
    NavbarAdmin,
    FontAwesomeIcon,
  },

  data() {
    return {
      logo_src: "/img/logo.png",
      app_name: "Espaços Miranda",
      email: "",
      username: "",
      password: "",
      userId: null,
      isEditing: false,
      showEditModal: false,
      originalData: {},
      editedData: {},
      editedUser: {},
      showModal: false,
      showPassword: false,
      users: [],
      columnVisibility: {
        email: true,
        username: true,
        password: true,
      },
    };
  },

  mounted() {
    // Username do link para saber quem e
    const idToLoad = this.$route.params.id;

    // chamar API para buscar dados do admin
    axios.get(`http://localhost:3000/admin?id=${idToLoad}`)
      .then(response => {
        if (response.data.length > 0) {
          const adminData = response.data[0];
          this.userId = adminData.id;
          this.email = adminData.email;
          this.username = adminData.username;
          this.password = adminData.password;

          // Salva os dados originais quando o componente é montado
          this.originalData = { email: this.email, username: this.username, password: this.password };
          // Inicializa os dados editados com os dados originais
          this.editedData = { ...this.originalData };

        } else {
          console.error("Admin não encontrado na API");
        }
      })
      .catch(error => {
        console.error("Erro ao buscar dados do admin na API", error);
      });

      // chamar API para buscar dados dos users
      axios.get('http://localhost:3000/users')
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error("Erro ao buscar dados dos utilizador na API", error);
        });
    },

  methods: {

    handleItemClick(event) {
      event.stopPropagation();
    },

    mostrarTodosCampos() {
      for (const key in this.columnVisibility) {
        this.columnVisibility[key] = true;
      }
    },

    openEditModal(user) {
      this.showEditModal = true;
      this.editedUser = { ...user };
    },

    closeEditModal() {
      this.showEditModal = false;
    },

    saveUserChanges() {
      const userIdToUpdate = this.editedUser.id; // Supondo que o objeto editedUser tenha um campo id para identificar o utilizador
      const updatedData = {
        email: this.editedUser.email,
        username: this.editedUser.username,
        password: this.editedUser.password,
        // ... outros campos
      };

      axios.put(`http://localhost:3000/users/${userIdToUpdate}`, updatedData)
        .then(response => {
          console.log("Dados do utilizador atualizados com sucesso:", response.data);
          // Toastr de sucesso
          toastr.success("Conta Editada com sucesso.", "Sucesso", {
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
        })
        .catch(error => {
          console.error("Erro ao atualizar dados do utilizador:", error);
          // Toastr de erro
          toastr.error("Erro ao editar a conta.", "Erro!", {
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

    confirmDeleteUser(userId) {
      const confirmDelete = window.confirm("Quer mesmo eliminar este utilizador?");
      if (confirmDelete) {
        axios.delete(`http://localhost:3000/users/${userId}`)
          .then(response => {
            console.log("Utilizador eliminado com sucesso:", response.data);
            // Toastr de sucesso
            toastr.success("Conta eliminada com sucesso.", "Sucesso", {
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
              
          })
          .catch(error => {
            console.error("Erro ao eliminar o utilizador:", error);
            // Toastr Erro
            toastr.error("Erro ao excluir a conta.", "Erro!", {
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

    async fetchUserData() {
      try {
        const response = await axios.get(`http://localhost:3000/users/${this.userId}`);
        if (response.data) {
          const userData = response.data;
          this.email = userData.email;
          this.username = userData.username;
          this.password = userData.password;
        } else {
          console.error("Dados do utilizador não encontrados");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do utilizador:", error);
      }
    },

    async confirmDelete() {
      const confirmDelete = window.confirm("Quer mesmo eliminar a sua conta?");
      if (confirmDelete) {
        try {
          // Use o id da rota para identificar o Utilizador
          const idToDelete = this.$route.params.id;

          // Encontre o Utilizador com base no id
          const response = await axios.get(`http://localhost:3000/admin?id=${idToDelete}`);
          if (response.data.length > 0) {
            const userIdToDelete = response.data[0].id;

            // Faça a solicitação DELETE usando o ID do Utilizador
            const deleteResponse = await axios.delete(`http://localhost:3000/admin/${userIdToDelete}`);

            if (deleteResponse.status === 200) {
              // Conta excluída com sucesso
              localStorage.removeItem("Register-Info");

              // Toastr de sucesso
              toastr.success("Conta eliminada com sucesso.", "Sucesso", {
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

              // Redirecionar para a página principal
              this.$router.push('/');
            }
          } else {
            // Utilizador não encontrado
            console.error("Utilizador não encontrado");
          }
        } catch (error) {
          console.error("Erro ao excluir a conta", error);
          // Toastr de erro
          toastr.error("Erro ao excluir a conta.", "Erro!", {
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
      }
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      const passwordInput = document.getElementById('password');
      if (this.showPassword) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },

    togglePasswordVisibilityEditarUser() {
      this.showPassword = !this.showPassword;
      const passwordInput = document.getElementById('passwordUser');
      if (this.showPassword) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },

    toggleEditMode() {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        this.saveChanges();
      }
    },

    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    saveChanges() {
      const userIdToUpdate = this.userId;
      const updatedData = {
        email: this.editedData.email,
        username: this.editedData.username,
        password: this.editedData.password,
        // ... outros campos
      };

      axios.put(`http://localhost:3000/admin/${userIdToUpdate}`, updatedData)
        .then(response => {
          console.log("Dados do utilizador atualizados com sucesso:", response.data);
          // Toastr de sucesso
          toastr.success("Conta Editada com sucesso.", "Sucesso", {
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
          console.error("Erro ao atualizar dados do utilizador:", error);
          // Toastr de erro
          toastr.error("Erro ao editar a conta.", "Erro!", {
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
  },

  computed: {
    
    filteredUsers() {
      return this.users.map(user => ({
        id: user.id,
        email: this.columnVisibility.email ? user.email : '',
        username: this.columnVisibility.username ? user.username : '',
        password: this.columnVisibility.password ? user.password : '',
      }));
    },
  },
};
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';


.btn-custom {
  margin-top: 20px;
  background-color: #b49760ab; 
  border-color: #b49760ab;
  color: white;
}

.btn-custom:hover {
  background-color: #6e5737;
  border-color: #6e5737;
}

.eye-icon {
  cursor: pointer;
  user-select: none;
  font-size: 25px;
}

/* Modal */

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 100%;
  border-radius: 10px;
}

.modal.show {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Table */

.table {
    width: 60%;
    margin: 0px auto; 
    font-size: 18px;
    border-collapse: collapse;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 2);
    margin-bottom: 100px;
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

/* Titulo Utilizadores */

.TitleUsers {
  color: white;
  padding: 50px;
  margin-top: 10px;
}

/* Filtros */

.btn-MostrarTudo {
  margin-right: 8px;
  margin-left: 826px;
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

/* botão Açoes */
.TextAcoes {
  text-align: left; /* Alinha o texto para a esquerda */
}

/* Adiciona espaçamento entre os botões na coluna "Ações" */
.table .TextAcoes button {
  margin-right: 5px; /* Adiciona espaçamento entre os botões */
}
</style>

