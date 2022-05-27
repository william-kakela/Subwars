<template>
  <div class="register">
    <h1>Registrera</h1>
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
  color: white;
  text-align: center;
}


.input-wrapper-register {
	display: flex;
	flex-direction: column;
	gap: 5px;
  padding-bottom: 20px;
  align-items: center;
}

.input-wrapper-register > input {
  width: 300px;
  background-color: #646464;
  border: none;
  padding: 10px;
  border-radius: 5px;
}

::placeholder {
  color: white;
}

.button-register {
   background: #646464;
   color: white;
   border-radius: 10px;
   padding-block: 15px;
   border: none;
   cursor: pointer;
   padding-inline: 30px;
   letter-spacing: 0.1rem;
   text-transform: uppercase;
   font-weight: 700;
}

</style>