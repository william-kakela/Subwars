<template>
  <div class="login">
    <h1>Logga in</h1>
    <form @submit.prevent="login">
      <div class="input-wrapper">
        <label for="email">E-postadress</label>
          <div v-if="error" class="alert alert-danger" role="alert">
          {{error}}
        </div>
        <input
          type="email"
          id="email"
          placeholder="Epostadress"
          v-model="email"
        />
      </div>

      <div class="input-wrapper">
        <label for="password">Lösenord</label>
        <input
          type="password"
          id="password"
          placeholder="Lösenord"
          v-model="password"
        />
      </div>
      <button type="submit" class="button-login">Logga in</button>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "@/firebase/firebase";

export default {
  name: "LoginView",

  data() {
    return {
      email: "",
      password: "",
      error: '',
    };
  },

  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const usersRef = collection(db, "users");

          // Create a query against the collection.
          const q = query(
            usersRef,
            where("auth_id", "==", userCredential.user.uid)
          );
          getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              const user = {
                ... userCredential.user,
                permission: doc.data().permission
              };
              this.$store.commit("SET_USER", user);
            });
             this.$router.push("/");
          });
        })
        .catch(() => {
          this.error = 'Fel användarnamn eller lösenord, vänlig försök igen';
        });
    },
  },
};
</script>

<style scoped>
.login {
  background: #272727;
  color: white;
  text-align: center;
}

label {
  color: white;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 20px;
  align-items: center;
}

.input-wrapper > input {
  width: 300px;
  background-color: #646464;
  border: none;
  padding: 10px;
  border-radius: 5px;
}

::placeholder {
  color: white;
}

.button-login {
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

h1 {
  color: white;
}
</style>