<template>
    <div>
      <div id="nav">
        <router-link id="logo-url" to="/"><img id="logo" :src="logo" :alt="alt"></router-link>
        <router-link :to="'/Admin/' + userId" class="size-and-hover">Página Admin</router-link>
        <!-- Dropdown menu -->
        <div class="dropdown">
          <a class="size-and-hover" @click="toggleDropdown">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </a>
          <div v-show="showDropdown" class="dropdown-content" @click="hideDropdown">
            <div class="router-link-wrapper">
              <router-link :to="'/DefinicoesAdmin/' + userId" class="RouterLinksDropDown settings-link">Definições</router-link>
            </div>
            <p @click="logout" class="dropdown-content-item">Logout</p>
          </div>
        </div>
        <!-- Fim do dropdown menu -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "NavbarAdmin",
    props: ["logo", "alt"],
    data() {
      return {
        showDropdown: false,
        username: "",
        userId: null,
      };
    },
    mounted() {
      const userData = JSON.parse(localStorage.getItem("Register-Info"));
      if (userData) {
        this.username = userData.username;
      }
  
      // Evento no Login
      this.userId = this.$route.params.id;
    },
    methods: {
      resetPage() {
        setTimeout(() => {
          window.location.reload();
        }, 1);
      },
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      },
      hideDropdown() {
        this.showDropdown = true;
      },
      logout() {
        this.$router.push("/");
        toastr.warning("Logout com sucesso!", "Cuidado", {
          closeButton: true,
          positionClass: "toast-bottom-right",
          progressBar: true,
          timeOut: 5000,
          extendedTimeOut: 1000,
          preventDuplicates: true,
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
          toastClass: "toast-warning",
        });
      },
    },
  };
  </script>
  
  <style scoped>
  #nav {
    background-color: #222;
    padding: 1px 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  
  #nav #logo-url {
    margin: auto;
    margin-left: 0;
  }
  
  #nav a {
    color: white;
    text-decoration: none;
    margin: 30px;
    transition: 0.5s;
  }
  
  .size-and-hover {
    font-size: 20px;
    color: white;
    transition: color 0.3s ease-in-out;
  }
  
  .size-and-hover:hover {
    color: #b49660 !important;
  }
  
  /* Estilo do dropdown */
  .dropdown {
    position: relative;
    display: inline-block;
  }
  
  /* Conteudo DropDown */
  
  .dropdown-content {
    display: none;
    position: absolute;
    background: #b49760d5;
    color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    top: 100%;
    left: auto;
    right: 0;
    cursor: pointer;
    animation: fade 0.5s ease; 
    /* Estilos Caixa Dropdown */
    border-radius: 5px;
    padding: 5px;
  }
  
  .dropdown:hover .dropdown-content {
    opacity: 1;
  }
  
  .dropdown .dropdown-content {
    display: block;
  }
  
  .router-link-wrapper {
    margin: 15px 0;
  }
  
  .RouterLinksDropDown {
    font-size: 20px;
    text-align: center;
    transition: color 0.3s ease-in-out;
  }
  
  .RouterLinksDropDown:hover,
  .settings-link:hover {
    color: #222 !important;
  }
  
  .dropdown-content p {
    font-size: 20px;
    text-align: center;
    transition: color 0.3s ease-in-out;
  }
  
  .dropdown-content p:hover {
    color: #222;
  }
  
  /* Animacoes DropDown */
  
  @keyframes fade {
      from {
          opacity: 0;
      }
      to {
          opacity: 1;
      }
  }
  </style>
  