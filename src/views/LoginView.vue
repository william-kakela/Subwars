<template>
	<div class="login">
		<h1>Subwars</h1>
		<form @submit.prevent="login">
			<div class="input-wrapper">
				<label for="email">E-postadress</label>
				<input type="email" id="email" placeholder="Epostadress" v-model="email" />
			</div>

			<div class="input-wrapper">
				<label for="password">Lösenord</label>
				<input type="password" id="password" placeholder="Lösenord" v-model="password" />
			</div>
			<button type="submit" class="button-login">Logga in</button>
		</form>
	</div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';
//import db from '@/firebase/firebase';

export default {
  name: "LoginView",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
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

     //async conectionLogin() {
      //const getAuth = getAuth 
      //const userAuthLoggedin = new userAuthLoggedin();
        //const users = await getAuth(getAuth, userAuthLoggedin);
        //const user = users.user;
        //const q = query(collection(db, "users"), where("uid", "==", user.uid));
        //const docs = await getDocs(q);
        //if(docs.docs.length === 0) {
          //await addDoc(collection(db,"users"), {
            //uid: user.uid,
            //name: user.username,
            //email: user.email
          //});
        //}
    //}
  },
  
};
</script>

<style scoped>

.login {
 background: #272727;
 min-height: 100vh;
 color: white;
 padding: 1rem;
}

label {
  color: white;
}

input {
  background: #646464;
  color: white;
  border-radius: 5px;
}

.input-wrapper {
	display: flex;
	flex-direction: column;
	gap: 5px;
  padding-bottom: 20px;
  margin-left: 780px;
  width: 308px;
}

::placeholder {
  color: white;
}

.button-login {
   background: #646464;
   color: white;
   border-radius: 10px;
   width: 80px;
   height: 40px;
   border: none;
   text-decoration: inter;
   font-size: bold;
   cursor: pointer;
}

h1 {
  text-decoration: bold;
  color: white;
  padding: 100px;
}
</style>