<template>
  <div class="tournaments">
    <div class="tournament-header">
      <h1>Turneringar</h1>
      <router-link
        to="/tournament-create"
        tag="button"
        class="create-tournament-button"
        v-if="user"
        >Skapa turnering</router-link
      >
    </div>

    <div
      class="tournament-box"
      v-for="tournament in tournaments"
      :key="tournament.uid"
    >
      <router-link :to="`/tournament/${tournament.id}`">
        {{ tournament.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import db from "@/firebase/firebase";

export default {
  name: "TournamentsView",

  created() {
    this.fetchTournaments();
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },

  data() {
    return {
      tournaments: [],
    };
  },

  methods: {
    async fetchTournaments() {
      const querySnapshot = await getDocs(collection(db, "tournaments"));
      querySnapshot.forEach((doc) => {
        this.tournaments.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    },
  },
};
</script>

<style scoped>

.tournaments {
  background: #272727;
  color: white;
}

.tournament-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tournament-box {
  background: #646464;
  height: 200px;
  display: grid;
  place-items: center;
  background: url("@/assets/fb_image.png");
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  margin-bottom: 50px;
  position: relative;
}

.tournament-box:before {
  content: "";
  position: absolute;
  left: 0; right: 0;
  top: 0; bottom: 0;
  background: rgba(0,0,0,.5);
}

.tournament-box a {
  text-decoration: none;
  font-size: 1.5rem;
  color: white;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  z-index: 50;
}
.tournament-box a:hover {
  background-image: linear-gradient(to right, #000, #000 50%, #f1c232 50%);
  background-size: 200% 100%;
  background-position: -100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease-in-out;
}

.create-tournament-button {
  height: 35px;
  width: 140px;
  border-radius: 10px;
  border: none;
  color: white;
  background: grey;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>