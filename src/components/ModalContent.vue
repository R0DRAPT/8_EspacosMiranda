<template>
  <div class="modal-content">
    <button @click="closeModal" class="close-button">&times;</button>

    <h3 style="color: #b49660;"><strong>LOG IN</strong></h3>

    <br>

    <form @submit.prevent="login" class="login-form">

      <div class="mb-3" style="font-family:Verdana">
        <!-- Utilizador -->
        <input type="text" class="form-control" id="username" placeholder="Nome de Utilizador" v-model="username" autocomplete="off" required>
      </div>

      <div style="margin: 2px;"></div>

      <div class="mb-3" style="font-family:Verdana">
        <!-- Password -->
        <div class="password-container">
          <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" autocomplete="off" required>
          <span class="eye-icon" @click="togglePasswordVisibility">&#128065;</span>
        </div>
      </div>

      <br>

      <div>
        <button type="submit" class="btn login-button-container">LOG IN</button>
      </div>

      <br>

      <div class="register-container">
        Não tem conta? <a href="#" @click="openRegisterModal" class="register-link">Registar</a>
      </div>

      <ModalRegister
        v-if="showRegisterModal"
        @close-modal="closeRegisterModal"
        @close-login-modal="closeLoginModal"
        :modalActive="showRegisterModal"
      />


    </form>
  </div>
</template>

<script>
import ModalRegister from "./ModalRegister.vue";
import axios from 'axios';

export default {
  name: "ModalContent",

  components: {
    ModalRegister,
  },
  data() {
    return {
      username: "",
      password: "",
      showRegisterModal: false,
      showPassword: false,
      showLoginModal: false,
    };
  },
  methods: {
    async login() {
      try {
        const adminResponse = await axios.get(`http://localhost:3000/admin`);
        const adminData = adminResponse.data[0];

        // Verificar se o utilizador é o admin
        const isAdmin = adminData.username === this.username && adminData.password === this.password;

        if (isAdmin) {
          // Exibir um prompt para inserir a chave
          const chave = prompt("Qual é a chave?");

          // Verificar se a chave inserida é igual à chave na base de dados
          if (chave === adminData.chave) {
            // login como admin
            toastr.success("Login como admin efetuado com sucesso.", "Sucesso!", {
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

            this.$emit('close-modal');
            this.$router.push({ name: 'Admin', params: { id: 999 } });
            return;
          } else {
            // Chave incorreta
            toastr.error("Chave incorreta. Acesso negado.", "Erro!", {
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
            return;
          }
        }

        // Se não for admin, verificar se é um usuário normal
        const userResponse = await axios.get(`http://localhost:3000/users?username=${this.username}&password=${this.password}`);
        const user = userResponse.data[0];

        if (user) {
          // Login Sucesso
          toastr.success("Login efetuado com sucesso.", "Sucesso!", {
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

          this.$emit('close-modal');
          this.$emit('user-logged-in', { username: user.username });
          this.$router.push({ name: 'HomeAposLogin', params: { id: user.id } });

        } else {
          // Credenciais inválidas
          toastr.error("Credenciais inválidas. Utilizador não encontrado.", "Erro!", {
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
      } catch (error) {
        //Login Erro 
        toastr.error("Erro ao realizar Login.", "Erro!", {
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


    closeModal() {
      this.$emit('close-modal');
    },

    openRegisterModal() {
      this.showRegisterModal = true;
      console.log("Modal de registro aberta:", this.showRegisterModal);
    },

    closeRegisterModal() {
      this.showRegisterModal = false;
    },

    closeLoginModal() {
      this.showLoginModal = false;
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
  },
};

</script>

<style scoped>
.modal-content {
  padding: 20px;
  position: relative;
  margin: 0 auto
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-button-container {
  color: white;
  background-color: #b49660; 
  width: 100%;
  transition: background-color 0.4s ease; 
}

.login-button-container:hover {
  background-color: #222;
  color: #b49660;
}

.form-control::placeholder {
  color: #979494b9;
  font-size: 14px;
}

.register-container {
  font-family: Verdana;
  color: #b49660;
  text-align: center;
}

.register-link {
  color: #b49660;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #222;
}

.close-button {
  position: absolute;
  top: -5px;
  right: 15px;
  font-size: 40px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #b49660;
}

.password-container {
  position: relative;
}

.eye-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
  font-size: 25px;
}
</style>
