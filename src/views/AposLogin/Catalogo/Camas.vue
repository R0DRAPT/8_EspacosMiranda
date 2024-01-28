<template>
    <div class="main-container" style="background-color: #292727;">
        <NavbarAposLogin :logo="logo_src" :alt="app_name" />
        <h1 style="color:white">Camas</h1>
    </div>
</template>

<script>
 import NavbarAposLogin from '../../../components/ComponentsAposLogin/NavbarAposLogin.vue';
  
  export default {
    name: "Camas",
  
    components: {
        NavbarAposLogin,
    },

    data() {
      return  {
        logo_src: "/img/logo.png",
        app_name: "Espaços Miranda",
        userId: null,
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
    },
  
    
  }
  </script>
  
<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>