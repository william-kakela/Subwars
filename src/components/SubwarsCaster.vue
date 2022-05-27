<template>
	<section class="tournament-view-side-info">
		<div class="casters">
			<div class="casters__wrapper">
				<small>Main casters</small>
				<ul class="casters__list">
					<li v-for="caster in mainCasters" :key="caster.id" class="caster">
						{{ caster.username }}
					</li>
				</ul>
			</div>
			
			<div class="casters__wrapper">
				<small>Co-Casters</small>
				<ul class="casters__list">
					<li v-for="caster in coCasters" :key="caster.id" class="caster">
						{{ caster.username }}
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<style scoped>
.tournament-view-side-info {
	display: flex;
	justify-content: end;
}

.tournament-view-side-info > .casters {
	display: flex;
	align-items: start;
	gap: 2rem;
}

.tournament-view-side-info > .casters > .casters__wrapper {
	display: flex;
	flex-direction: column;
	align-items: end;
}

.tournament-view-side-info > .casters > .casters__wrapper > small {
	color: #272727;
	font-size: 0.8rem;
}

.tournament-view-side-info > .casters > .casters__wrapper > .casters__list {
	list-style: none;
}

.tournament-view-side-info > .casters > .casters__wrapper > .casters__list > .caster {
	color: #ffffff;
	font-weight: 700;
}
</style>