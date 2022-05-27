<template>
    <section class="tournament-view-side-info">
        <div class="casters">
            <div class="casterswrapper">
                <small>Main casters</small>
                <ul class="casterslist">
                    <li v-for="(caster, index) in mainCasters" :key="index" class="caster">
                        {{ caster.username }}
                    </li>
                </ul>
            </div>

            <div class="casterswrapper">
                <small>Co-Casters</small>
                <ul class="casterslist">
                    <li v-for="(caster, index) in coCasters" :key="index" class="caster">
                        {{ caster.username }}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'SubwarsCasters',
    data: () => ({
        coCasters: [],
        mainCasters: [],
    }),
};
</script>

<style scoped>
.tournament-view-side-info {
    display: flex;
    align-items: start;
    justify-content: end;
}

.tournament-view-side-info > .casters {
    display: flex;
    align-items: start;
    gap: 2rem;
}

.tournament-view-side-info > .casters > .casterswrapper {
    display: flex;
    flex-direction: column;
    align-items: end;
}

.tournament-view-side-info > .casters > .casterswrapper > small {
    color: #fff;
    font-size: 0.8rem;
}

.tournament-view-side-info > .casters > .casterswrapper > .casterslist {
    list-style: none;
}

.tournament-view-side-info > .casters > .casterswrapper > .casterslist > .caster {
    color: #ffffff;
    font-weight: 700;
}
</style>