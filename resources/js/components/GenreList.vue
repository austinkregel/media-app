<template>
    <div>
        <div v-for="genre in genres" :key="genre.id" class="flex flex-wrap w-full">
            <div class="font-semibold text-2xl mt-4 mx-4">{{ genre.name }}</div>
            <div v-if="genre.medias">
                <files :files="genre.medias"></files>
            </div>
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