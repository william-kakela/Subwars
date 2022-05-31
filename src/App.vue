<template>
  <div id="app">
    <nav class="container">
      <router-link class="brand" to="/">#Subwars</router-link>
      <router-link to="/">Hem</router-link>
      <router-link to="/news">Nyheter</router-link>
      <router-link to="/tournaments">Turneringar</router-link>
      <router-link to="/register" v-if="!user">Registrera</router-link>
      <router-link to="/login" class="login-button" v-if="!user"
        >Logga in</router-link
      >
      <button type="button" class="login-button" v-if="user" @click="logout">
        Logga ut
      </button>
    </nav>
    <div class="container">
      <div class="inner-container">
        <router-view />
      </div>
    </div>
    <footer>
      <div class="wrapper-footer container">
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
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "App",

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },

  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        this.$store.commit("SET_USER", null);
      });
    },

    matchUser() {
    },
  },
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  font-size: 100%;
  box-sizing: border-box;
  background-color: #272727;
}

.container {
  max-width: 1224px;
  margin-inline: auto;
  padding-inline: 1rem;
}

.inner-container {
  padding-block: 3rem;
  min-height: calc(100vh - 380px - 60px);
}

nav {
  padding-block: 30px;
  text-decoration: none;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #272727;
  border-bottom: 1px solid #404040;
}

nav a {
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: #ccc;
}
nav a:hover {
  color: white;
}

nav a.router-link-exact-active {
  text-decoration: none;
  transition: all 0.3s ease 0s;
}

.brand {
  font-size: 16px;
  font-weight: 900;
  color: white;
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
  padding: 4rem;
  text-align: center;
}

footer h3 {
  color: white;
}

footer p {
  color: white;
}

.wrapper-footer {
  display: grid;
  place-items: center;
}
</style>