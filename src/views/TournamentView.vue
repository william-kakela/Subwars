<template>
	<div v-if="tournament" id="tournament-view">
		<section>
			<h3 class="title-text">{{ tournament.title }}</h3>
			<p class="bread-text">
				Välkommen till Subwars, Detta är en turnering för att skapa en roligt upplevelse och en chans på att vinna fantastiska priser. 
				Var god att läs igenom reglerna innan du anmäler dig till turneringen.
			</p>
		</section>

		<section>
			<SubwarsCaster/>
			<div class="cta-wrapper">
				<button type="button" style="background-color: #202020;">Lämna</button>
				<button type="button" style="background-color: #202020;">Registrera</button>
			</div>
		</section>

		<section>
			<h3 class="title-text">Priser</h3>
			<div class="price-box-wrapper">
				<div class="price-box"></div>
				<div class="price-box"></div>
				<div class="price-box"></div>
				<div class="price-box"></div>
				<div class="price-box"></div>
				<div class="price-box"></div>
			</div>
		</section>

		<section>
			<h3 class="title-text">Regler</h3>
			<p class="bread-text">
				Fusk är förbjudet! Vid FUSK = direkt bannad från alla deltaganden i subwars.
				Rasism är totalt förbjudet.
				Man spelar mr 16 där det vinnande laget går vidare och det förlorande laget åker ut.
			</p>
		</section>

		<section id="team-section" v-if="users.length">
			<div v-for="(team, team_index) in teams" :key="team_index" class="team">
				<h4 class="team-title">#Lag {{ team_index + 1 }}</h4>
				<div v-for="(user, index) in team" :key="user.id" class="team-user">
					{{ user.username }} - {{ user.rank }} - {{ user.elo }} 
					<button type="button" @click="deleteUser(user, index)">
						Ta bort
					</button>
				</div>
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
} from 'firebase/firestore';
import db from '@/firebase/firebase';
import SubwarsCaster from '@/components/SubwarsCaster.vue';

export default {
	name: 'TournamentView',
	components: {
		SubwarsCaster,
	},
	data() {
		return {
			tournament: null,
			users: [],
			casters: [],
			teams: [],
		};
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
	},
	async created() {
		await this.fetchTournament();
		await this.fetchUsers();
		this.randomizeTeams();
	},

  watch: {
        users() {
            this.randomizeTeams();
        },
    },
    
	methods: {
		async fetchTournament() {
			const docRef = doc(db, 'tournaments', this.$route.params.id);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				this.tournament = docSnap.data();
			} else {
				console.error('Hittade inga turneringar!');
			}
		},
		async fetchUsers() {
			this.users = []
			const querySnapshot = await getDocs(collection(db, 'users'));
			querySnapshot.forEach((user) => {
				this.users.push({ ...user.data(), id: user.id });
			});
		},
		async deleteUser(user) {
			await deleteDoc(doc(db, 'users', user.id));
			// Ta bort användaren lokalt.
			//this.users.splice(index, 1);
			this.fetchUsers();
		},
		randomizeTeams() {
			let size = 5;
			this.teams = [];
			Array.from({ length: Math.ceil(this.users.length / size) }, (val, i) => {
				this.teams.push(this.users.slice(i * size, i * size + size, val));
			});
			console.log(this.teams);
		},
	},
};
</script>

<style scoped>
#tournament-view {
	color: #fff;
	display: grid;
	gap: 5rem;
	grid-template-columns: 1fr 1fr;
}

.title-text {
	font-size: 24px;
	line-height: 1.2rem;
	font-weight: 700;
	margin-top: 0;
	margin-bottom: 2rem;
	text-transform: capitalize;
}

.bread-text {
	color: #ccc;
	font-size: 16px;
	line-height: 1.2rem;
}

.cta-wrapper {
	display: flex;
	align-items: center;
	gap: 20px;
	justify-content: end;
}

.price-box-wrapper {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.price-box {
	height: 120px;
	width: 120px;
	background-image: url("@/assets/nocco.png");
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
	background-color: #202020;
}

#team-section {
	grid-column: 1 / span 2;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2rem;
}

.team {
	background-color: #202020;
	padding: 1.5rem;
}

.team-title {
	font-weight: 700;
	font-size: 20px;
	margin-top: 0;
}

.team-user {
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
}

button {
	border: none;
	color: #fff;
	font-size: 12px;
	font-weight: 700;
	background-color: #272727;
	padding: 0.75rem 3rem;
	border-radius: 10px;
	cursor: pointer;
	transition: color 500ms ease-in;
}

button:hover {
	box-shadow: 2px 3px rgba(0, 0, 0, 0.3);
}
</style>
