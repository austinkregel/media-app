<template>
    <div class="w-full">
        <div class="font-semibold text-2xl mt-4 mx-4">{{ genre.name }}</div>
        <div v-if="genre.medias">
            <files :files="genre.medias" :files-key="genre.id"></files>
        </div>
    </div>
</template>

<script>
export default {
    props: ["genre"]
};
</script>