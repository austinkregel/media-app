<template>
    <div v-if="activeFile">
        <video id="videoPlayer" controls class="w-full shadow">
            <source :src="'/api/media/'+activeFile.id" type="video/mp4" />
        </video>
    </div>
</template>
<script>
export default {
    props: ["file"],
    computed: {
        activeFile() {
            return this.$store.getters.files.filter(
                file => file.hash === this.$route.params.id
            )[0];
        }
    },
    mounted() {
        videojs("videoPlayuer", window.videoOptions, function() {
            this.play();
        });
    }
};
</script>