<template>
  <div class="register">
    <h1>Registrera</h1>
    <form @submit.prevent="register">
      <div class="input-wrapper-register">
        <label for="email">E-postadress</label>
        <input
          type="email"
          id="email"
          placeholder="Epostadress"
          v-model="email"
        />
      </div>

      <div class="input-wrapper-register">
        <label for="password">Lösenord</label>
        <input
          type="password"
          id="password"
          placeholder="Lösenord"
          v-model="password"
        />
      </div>
      <div class="input-wrapper-register">
        <label for="elo">Elo</label>
        <input type="number" id="elo" placeholder="Elo" v-model="user.elo" />
      </div>
      <div class="input-wrapper-register">
        <label for="rank">Rank</label>
        <input type="text" id="rank" placeholder="Rank" v-model="user.rank" />
      </div>
      <div class="input-wrapper-register">
        <label for="username">Användarnamn</label>
        <input
          type="text"
          id="username"
          placeholder="Användarnman"
          v-model="user.username"
        />
      </div>
      <div class="input-wrapper-register">
        <label for="permission">Behörighet</label>
        <select name="permission" id="permission" v-model="user.permission">
          <option value="">Välj</option>
          <option value="USER">Användare</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <button type="submit" class="button-register">Registrera</button>
    </form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import db from "@/firebase/firebase";

export default {
  name: "RegisterView",

  data() {
    return {
      email: "",
      password: "",
      user: {
        elo: 1500,
        rank: "Master",
        username: "",
        permission: "",
      },
    };
  },

  methods: {
    register() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          addDoc(collection(db, "users"), {
            elo: this.user.elo,
            email: this.email,
            rank: this.user.rank,
            username: this.user.username,
            permission: this.user.permission,
            auth_id: userCredential.user.uid,
          }).then((docCredentials) => {
            const docRef = doc(db, "users", docCredentials.id);
            getDoc(docRef).then((docUser) => {
              const user = {
                ...userCredential.user,
                permission: docUser.data().permission,
              };
              this.$store.commit("SET_USER", user);
            });

            this.$router.push("/");
          });
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