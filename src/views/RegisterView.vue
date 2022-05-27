<template>
  <div class="register">
    <h1>Registera</h1>
    <form @submit.prevent="register">
      <div class="input-wrapper-register">
      <label for="email">E-postadress</label>
      <input type="email" id="email" placeholder="Epostadress" v-model="email" />
      </div>

      <div class="input-wrapper-register">
      <label for="password">Lösenord</label>
      <input type="password" id="password" placeholder="Lösenord" v-model="password" />
      </div>
      <button type="submit" class="button-register">Registrera</button>
    </form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "RegisterView",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    register() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.$store.commit('SET_USER', user);
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>

.register {
  background: #272727;
  min-height: 100vh;
  color: white;
  padding: 1rem;
}

.input-wrapper-register {
	display: flex;
	flex-direction: column;
	gap: 5px;
  padding-bottom: 20px;
  width: 308px;
  margin-left: 780px;
}

::placeholder {
  color: white;
}

.button-register {
   background: #646464;
   color: white;
   border-radius: 10px;
   width: 80px;
   height: 40px;
   border: none;
   cursor: pointer;
}

</style>