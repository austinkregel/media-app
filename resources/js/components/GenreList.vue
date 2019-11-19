<template>
    <div>
        <div v-for="genre in genres" v-if="genre.medias.length > 0" class="flex flex-wrap w-full">
            <genre :genre="genre"></genre>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            genres: this.$store.getters.genres
        };
    },
    mounted() {}
};
</script>