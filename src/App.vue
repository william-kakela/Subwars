<template>
  <div id="app">
    <nav>
      <router-link to="/">#Subwars</router-link>
      <router-link to="/">Hem</router-link>
      <router-link to="/news">Nyheter</router-link>
      <router-link to="/tournaments">Turneringar</router-link>
      <router-link to="/register" v-if="isLoggedIn()">Registera</router-link>
      <router-link to="/login" tag="button" class="login-button"
        >Login</router-link
      >
    </nav>
    <router-view />
    <footer>
      <div class="wrapper-footer">
        <h3>#Subwars</h3>
        <p>
          Här kan du möta och spela med de härliga streamers vårat community
          erbjuder. Vinn fina priser och ha en riktigit kul stund!
        </p>
      </div>
    </footer>
  </div>
</template>


<script>
export default {
  
  data() {
    
  },

  methods: {
    isLoggedIn() {
      this.$store.user = true;
       return this.$route.path === '/';
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  font-size: 100%;
  box-sizing: border-box;
}

nav {
  padding: 30px;
  text-decoration: none;
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #272727;
  border-style: outset;
}

nav a {
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: white;
}
nav a:hover {
  transition: all 0.3s ease 0s;
}

nav a.router-link-exact-active {
  text-decoration: none;
  transition: all 0.3s ease 0s;
}

.login-button {
  padding: 9px 25px;
  background-color: #f1c232;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  color: white;
}

.login-button:hover {
  background-color: rgba(0, 136, 169, 8);
}

footer {
  height: 120px;
  background-color: #000;
  display: grid;
  place-items: center;
  inset-inline: 0;
  bottom: 0;
  padding: 4rem;
}

footer h3 {
  color: white;
}

footer p {
  color: white;
}

.wrapper-footer {
  align-items: center;
  width: 450px;
}
</style>
