<template>
  <div class="tournament-view" v-if="tournament">
    <section class="tournament-view-left">
      <h3>{{ tournament.title }}</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet
        architecto consectetur debitis dicta dignissimos distinctio, dolor
        doloremque doloribus, eius, enim et fuga fugiat id illum ipsa iste
        itaque.
      </p>
      <h3>Priser</h3>
      <div class="price-box-wrapper">
        <div class="price-box"></div>
        <div class="price-box"></div>
        <div class="price-box"></div>
        <div class="price-box"></div>
        <div class="price-box"></div>
        <div class="price-box"></div>
      </div>
    </section>

    <section class="tournament-view-right">
      <SubwarsCaster/>
      <div class="button-wrapper">
        <button type="button" class="leave">Lämna</button>
        <button type="button" class="button-register-tournamnet">
          Registrera
        </button>
      </div>
      <h3>Regler</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
        expedita iste maiores minima odio omnis quo ratione sequi? Alias animi
        autem blanditiis, commodi dolor dolore harum odit quia similique
        tempore. Aut cumque dignissimos dolores, fugit libero maiores, neque,
        numquam odio quas recusandae tempora tenetur? Ab at commodi esse
        explicabo odit ratione, sequi tenetur voluptates. Aperiam architecto in
        ipsum molestias, nisi provident quae quod. Dolor doloribus ipsam
        praesentium repudiandae temporibus. Architecto ea est impedit in.
      </p>
      <button
          type="button"
          class="new-button"
          @click="randomizeTeams(user, index)"
        >
          slumpa lag
        </button>
    </section>

    <section class="tournament-view-bottom" v-if="tournament">
      <h3 class="team">#Lag 1</h3>
      {{ tournament.title }}
      <div v-for="(user, index) in users" :key="user.id">
        {{ user.username }} - {{ user.rank }} - {{ user.elo }}
        <button
          type="button"
          class="kick-player"
          @click="deleteUser(user, index)"
        >
          Ta bort
        </button>
      </div>
    </section>
    <section class="tournament-view-bottom" v-if="tournament">
      <h3 class="team">#Lag 2</h3>
      {{ tournament.title }}
      <div v-for="(user, index) in users" :key="user.id">
        {{ user.username }} - {{ user.rank }} - {{ user.elo }}
        <button
          type="button"
          class="kick-player"
          @click="deleteUser(user, index)"
        >
          Ta bort
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import {
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import db from "@/firebase/firebase";
import SubwarsCaster from "@/components/SubwarsCaster.vue";

export default {
  name: "TournamentView",

  components: {
    SubwarsCaster,
  },

  data() {
    return {
      tournament: null,
      users: [],
      casters: [],
      chunked: [],
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    this.fetchTournament();
    this.fetchUsers();
    this.randomizeTeams();
  },
  methods: {
    async fetchTournament() {
      const docRef = doc(db, "tournaments", this.$route.params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.tournament = docSnap.data();
      } else {
        console.error("Hittade inga turneringar!");
      }
    },
    async fetchUsers() {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((user) => {
        this.users.push({ ...user.data(), id: user.id });
      });
    },

    async deleteUser(user, index) {
      await deleteDoc(doc(db, "users", user.id));
      // Ta bort användaren lokalt.
      this.users.splice(index, 1);
    },

    randomizeTeams() {
      let size = 5;
      Array.from({ length: Math.ceil(this.users.length / size) }, (val, i) => {
        this.chunked.push(this.users.slice(i * size, i * size + size, val));
      });
      console.log(this.chunked);
    },
  },
};
</script>

<style scoped>
.tournament-view {
  background-color: #272727;
  min-height: 100vh;
  color: white;
  padding: 3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.tournament-view-left {
}

.price-box-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.price-box {
  height: 120px;
  width: 120px;
  background: url("@/assets/nocco.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: 2rem;
}

.tournament-view-right {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-end;
  /* Du kan nog ta bort allt detta. Om något kanske du vill ha flex column här */
}

.tournament-view-bottom {
  padding: 10px 30px;
}

.reserv-player {
  background: #999999;
  width: 100px;
  height: 25px;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.kick-player {
  background: #646464;
  width: 100px;
  height: 25px;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.leave {
  background: #c4c4c4;
  color: white;
  border-radius: 10px;
  width: 80px;
  height: 40px;
  border: none;
  cursor: pointer;
}

.button-register-tournamnet {
  background: #666666;
  color: white;
  border-radius: 10px;
  width: 80px;
  height: 40px;
  border: none;
}

/* Wrappa både main-casters och co-casters i denna klassen */
.caster-wrapper {
  display: flex;
  /* Lägg till gap för att få mellanrum mellan dom ist */
  gap: 20px;
}

/* Man tar bort list-style på själva ol eller ul */
.caster-wrapper > ul {
  list-style: none;
}

.tournament-view-bottom {
  border-style: solid;
}
</style>