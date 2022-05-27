<template>
	<div class="login">
		<h1>Logga in</h1>
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