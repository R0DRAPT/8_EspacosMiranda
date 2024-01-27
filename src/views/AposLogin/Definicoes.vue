<template>
  <div class="main-container" style="background-color: #292727; text-align: center;">
    <NavbarAposLogin :logo="logo_src" :alt="app_name" />

    <h2 class="contaCSS">Sua Conta</h2>

    <form class="user-form" style="text-align: center; margin: 0 auto; max-width: 500px;">
      <div class="mb-3" style="font-family:Verdana">
        <!-- Email -->
        <input type="text" class="form-control" id="email" placeholder="Seu Email"  v-model="editedData.email" autocomplete="off" :readonly="!isEditing">
      </div>

      <div style="margin: 2px;"></div>

      <div class="mb-3" style="font-family:Verdana">
        <!-- Utilizador -->
        <input type="text" class="form-control" id="username" placeholder="Seu Nome de Utilizador"  v-model="editedData.username" autocomplete="off" :readonly="!isEditing">
      </div>

      <div style="margin: 2px;"></div>

      <div class="mb-3" style="font-family:Verdana">
        <!-- Password -->
        <div class="password-container">
          <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" placeholder="Sua Password"  v-model="editedData.password" autocomplete="off" :readonly="!isEditing">
          <span class="eye-icon" @click="togglePasswordVisibility">&#128065;</span>
        </div>
      </div>
    </form>

    <div class="EditarConta" @click="toggleEditMode">
      <button class="btn-lg btn-info">{{ isEditing ? 'Salvar Modificações' : 'Editar Conta' }}</button>
    </div>

    <div class="btn-EliminarConta">
      <button @click="confirmDelete" class="btn-lg btn-danger">Eliminar Conta</button>
    </div>
    
  </div>
</template>

<script>

import axios from 'axios';
import NavbarAposLogin from '../../components/ComponentsAposLogin/NavbarAposLogin.vue';

export default {
  name: "Definicoes",

  components: {
    NavbarAposLogin,
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
      originalData: {},
      editedData: {},
    };
  },

  mounted() {
    // Use o username da rota para identificar o usuário
    const idToLoad = this.$route.params.id;

    // Faça uma chamada à sua API para buscar os dados do usuário com base no username
    axios.get(`http://localhost:3000/users?id=${idToLoad}`)
      .then(response => {
        if (response.data.length > 0) {
          const userData = response.data[0];
          this.userId = userData.id;
          this.email = userData.email;
          this.username = userData.username;
          this.password = userData.password;

          // Salva os dados originais quando o componente é montado
          this.originalData = { email: this.email, username: this.username, password: this.password };
          // Inicializa os dados editados com os dados originais
          this.editedData = { ...this.originalData };

        } else {
          console.error("Usuário não encontrado na API");
        }
      })
      .catch(error => {
        console.error("Erro ao buscar dados do usuário na API", error);
      });
  },

  methods: {
    async confirmDelete() {
      const confirmDelete = window.confirm("Quer mesmo eliminar a sua conta?");
      if (confirmDelete) {
        try {
          // Use o id da rota para identificar o usuário
          const idToDelete = this.$route.params.id;

          // Encontre o usuário com base no id
          const response = await axios.get(`http://localhost:3000/users?id=${idToDelete}`);
          if (response.data.length > 0) {
            const userIdToDelete = response.data[0].id;

            // Faça a solicitação DELETE usando o ID do usuário
            const deleteResponse = await axios.delete(`http://localhost:3000/users/${userIdToDelete}`);

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
            // Usuário não encontrado
            console.error("Usuário não encontrado");
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

    toggleEditMode() {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        this.saveChanges();
      }
    },

    saveChanges() {
      const userIdToUpdate = this.userId;
      const updatedData = {
        email: this.editedData.email,
        username: this.editedData.username,
        password: this.editedData.password,
        // ... outros campos
      };

      axios.put(`http://localhost:3000/users/${userIdToUpdate}`, updatedData)
        .then(response => {
          console.log("Dados do usuário atualizados com sucesso:", response.data);
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
          console.error("Erro ao atualizar dados do usuário:", error);
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
};
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

.contaCSS {
  text-align: center;
  color: white;
  position: relative;
  padding: 20px;
  transition: color 0.3s;
  cursor: default;
}

.contaCSS:hover {
  color: #b49760ab;
}

.eye-icon {
  position: absolute;
  top: 305px;
  right: 695px;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
  font-size: 25px;
}

.btn-EliminarConta {
  margin-top: 329px;
  padding-bottom: 30px;
}

.btn-EditarConta {
  padding: 30px;
}
</style>

