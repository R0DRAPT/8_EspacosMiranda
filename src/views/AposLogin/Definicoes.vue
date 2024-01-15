<template>
  <div class="main-container" style="background-color: #292727;">
    <NavbarAposLogin :logo="logo_src" :alt="app_name" />
    <h1 style="color: white;">Definicoes</h1>

    <button @click="confirmDelete" class="btn btn-danger">Eliminar Conta</button>
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
    };
  },

  mounted() {
    // Recupera Dados no localStorage
    const userData = JSON.parse(localStorage.getItem("Register-Info"));
    if (userData) {
      this.userId = userData.id;
    }
  },

  methods: {
    async confirmDelete() {
      const confirmDelete = window.confirm("Quer mesmo eliminar a sua conta?");
      if (confirmDelete) {
        try {
          // Use o username da rota para identificar o usuário
          const usernameToDelete = this.$route.params.username;

          // Encontre o usuário com base no username
          const response = await axios.get(`http://localhost:3000/users?username=${usernameToDelete}`);
          if (response.data.length > 0) {
            const userIdToDelete = response.data[0].id;

            // Faça a solicitação DELETE usando o ID do usuário
            const deleteResponse = await axios.delete(`http://localhost:3000/users/${userIdToDelete}`);

            if (deleteResponse.status === 200) {
              // Conta excluída com sucesso
              localStorage.removeItem("Register-Info");

              // Toastr de sucesso
              toastr.success("Conta excluída com sucesso.", "Sucesso", {
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
  },
};
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>