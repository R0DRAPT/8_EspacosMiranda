<template>
  <div>
    <NavbarAposLogin :logo="logo_src" :alt="app_name" />
    <Banner />
    <section class="main-container" style="background-color: #b49660; padding:20px; font-size: 18px; margin-right: 300px;">
      <h4 class="spacebetween" style="font-family: 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Bem Vindo <b>{{ username }}</b></h4>
      <p class="spacebetween paragrafo-main" style="font-family: verdana" >──────</p>
      <p class="spacebetween paragrafo-main"><b style="font-family: 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Agora já tem acesso aos nossos artigos</b></p>
      <p class="spacebetween paragrafo-main" style="font-family: 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Pode ver os artigos, as imagens desse artigo e também os seus componentes.</p>
      <!-- <p class="spacebetween paragrafo-main" style="font-family: 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;"></p> -->
    </section>
    
    <!-- Row 1 -->
    <section style="color: white; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; margin-top: 30px; "> 
      <!-- SOFÁS -->
      <router-link :to="{ name: 'Sofas', params: { id: userId  } }">
        <div class="hover-box" @mouseover="showProductName('SOFÁS', $event)" @mouseleave="hideProductName($event)">
          <img src="/img/Catalogo/Sofas.png" alt="SOFÁS">
          <p class="product-name">SOFÁS</p>
        </div>
      </router-link>

      <!-- Cadeirões -->
      <router-link :to="{ name: 'Cadeiroes', params: { id: userId } }">
        <div class="hover-box" @mouseover="showProductName('CADEIRÕES', $event)" @mouseleave="hideProductName($event)">
          <img src="/img/Catalogo/Cadeiroes.png" alt="CADEIRÕES">
          <p class="product-name">CADEIRÕES</p>
        </div>
      </router-link>

      <!-- Consolas -->
      <router-link :to="{ name: 'Consolas', params: { id: userId } }">
        <div class="hover-box" @mouseover="showProductName('CONSOLAS', $event)" @mouseleave="hideProductName($event)">
          <img src="/img/Catalogo/Consolas.png" alt="CONSOLAS">
          <p class="product-name">CONSOLAS</p>
        </div>
      </router-link>
    </section>

    <!-- Row 2 -->
    <section style="color: white; display: flex; flex-wrap: wrap; justify-content: center; align-items: center;">  
      <!-- Pecas de Decoração -->
      <router-link :to="{ name: 'PecasDecoracao', params: { id: userId } }">
        <div class="hover-box" @mouseover="showProductName('PECAS DE DECORAÇÃO', $event)" @mouseleave="hideProductName($event)">
          <img src="/img/Catalogo/PecasDecoracao.png" alt="PECAS DE DECORAÇÃO">
          <p class="product-name">PECAS DE DECORAÇÃO</p>
        </div>
      </router-link>

      <!-- Cadeiras -->
      <router-link :to="{ name: 'Cadeiras', params: { id: userId } }">
        <div class="hover-box" @mouseover="showProductName('CADEIRAS', $event)" @mouseleave="hideProductName($event)">
          <img src="/img/Catalogo/Cadeiras.png" alt="CADEIRAS">
          <p class="product-name">CADEIRAS</p>
        </div>
      </router-link>

      <!-- BANQUETAS -->
      <router-link :to="{ name: 'Banquetas', params: { id: userId } }">
        <div class="hover-box" @mouseover="showProductName('BANQUETAS', $event)" @mouseleave="hideProductName($event)">
          <img src="/img/Catalogo/Banquetas.png" alt="BANQUETAS">
          <p class="product-name">BANQUETAS</p>
        </div>
      </router-link>
    </section>

    <!-- Row 3 -->
    <section style="color: white; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; margin-bottom: 30px;">
      <!-- Mesas de Cabeceira -->
      <router-link :to="{ name: 'MesasCabeceira', params: { id: userId } }">
        <div class="hover-box" @mouseover="showProductName('MESAS DE CABECEIRA', $event)" @mouseleave="hideProductName($event)">
          <img src="/img/Catalogo/MesasCabeceira.png" alt="MESAS DE CABECEIRA">
          <p class="product-name">MESAS DE CABECEIRA</p>
        </div>
      </router-link>

      <!-- Camas -->
      <router-link :to="{ name: 'Camas', params: { id: userId } }">
        <div class="hover-box" @mouseover="showProductName('CAMAS', $event)" @mouseleave="hideProductName($event)">
          <img src="/img/Catalogo/Camas.png" alt="CAMAS">
          <p class="product-name">CAMAS</p>
        </div>
      </router-link>

      <!-- Mesas -->
      <router-link :to="{ name: 'Mesas', params: { id: userId } }">
        <div class="hover-box" @mouseover="showProductName('MESAS', $event)" @mouseleave="hideProductName($event)">
          <img src="/img/Catalogo/Mesas.png" alt="MESAS">
          <p class="product-name">MESAS</p>
        </div>
      </router-link>
    </section>

  </div>
</template>

<script>
import NavbarAposLogin from '../../components/ComponentsAposLogin/NavbarAposLogin.vue';
import Banner from "../../components/Banner.vue";
import axios from 'axios';

export default {
  name: "HomeAposLogin",

  components: {
    NavbarAposLogin,
    Banner,
  },

  data() {
    return {
      username: "",
      userId: null,
      logo_src: "/img/logo.png",
      app_name: "Espaços Miranda"
    };
  },

  mounted() {
    // Recupera Dados no localStorage
    const userData = JSON.parse(localStorage.getItem("Register-Info"));
    if (userData) {
      this.username = userData.username;
    }

    // Evento no Login
    this.userId = this.$route.params.id;

    // Fetch user details based on userId
    this.fetchUserDetails();
  },

  methods: {
    showProductName(name, event) {
      const hoverBox = event.currentTarget;
      const productNameElement = hoverBox.querySelector('.product-name');

      if (productNameElement) {
        const boxRect = hoverBox.getBoundingClientRect();
        const centerX = boxRect.width / 2;
        const centerY = boxRect.height / 2;

        productNameElement.style.left = `50%`;
        productNameElement.style.top = `50%`;
        productNameElement.style.transform = `translate(-50%, -50%)`;
        productNameElement.style.opacity = 1;
      }
    },
    
    hideProductName(event) {
      const productNameElement = event.target.querySelector('.product-name');
      if (productNameElement) {
        productNameElement.style.opacity = 0;
      }
    },
    
    async fetchUserDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/users/${this.userId}`);
        const user = response.data;

        if (user) {
          // Update the username
          this.username = user.username;
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    },
  },
}
</script>

<style scoped>
@import 'bootstrap/dist/css/bootstrap.min.css';

h4 {
  margin-left: 430px;
  text-align: left;
  font-size: 24px;
  color: #2b2a2a !important;
}

.paragrafo-main {
  margin-left: 430px;
  font-size: 20px;
}
.spacebetween {
  margin-bottom: -1px;
}

.hover-box {
  position: relative;
  width: 380px;
  height: 280px;
  margin: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.hover-box img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.hover-box:hover img {
  opacity: 0.2;
}

.hover-box:hover {
  background: rgba(67, 64, 52, 0.74);
  cursor: pointer;
}

.product-name {
  position: absolute;
  font-size: 18px;
  color: #b49660;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-family: "Montserrat", sans-serif !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
}
</style>
