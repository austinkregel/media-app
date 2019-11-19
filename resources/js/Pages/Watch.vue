<style scoped>
.videoPlayer-dimensions {
    width: 100%;
}
</style>
<template>
    <div v-if="$route.params.id" class="h-full w-full bg-black">
        <video id="videoPlayer" controls class="h-full shadow mx-auto outline-none video-js">
            <source :src="'/api/media/'+$route.params.id" type="video/mp4" />
        </video>

        <div v-if="!playing">
            <div
                class="fixed text-2xl z-10 top-0 left-0 right-0 bottom-0"
                style="background: rgba(0,0,0,0.3"
            >
                <div class="text-white absolute top-0 left-0 m-8">
                    <button @click="goBack" role="button" class="outline-none focus:outline-none">
                        <svg
                            class="fill-current w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <polygon
                                points="3.828 9 9.899 2.929 8.485 1.515 0 10 .707 10.707 8.485 18.485 9.899 17.071 3.828 11 20 11 20 9 3.828 9"
                            />
                        </svg>
                    </button>
                </div>
                <button
                    class="w-full h-full flex text-white items-center outline-none focus:outline-none"
                    @click="() => Bus.$emit('togglePlayback')"
                    role="button"
                >
                    <div class="m-8 tracking-wide leading-tight text-left">
                        <div class="text-sm">You're watching</div>
                        <div class="text-4xl mt-2 font-bold">{{file.name}}</div>
                        <div class="text-small font-bold mt-2"></div>
                        <div class="text-xs mt-2 w-full md:w-2/3">{{file.media.plot}}</div>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import "video.js/dist/video-js.min.css";
export default {
    data() {
        return {
            playing: true,
            showOverlay: true,
            file: {},
            Bus,
            player: null
        };
    },
    methods: {
        goBack() {
            this.player.dispose();

            this.$router.back();
        }
    },
    async mounted() {
        this.file = this.$store.getters.media;
        if (!this.file) {
            const { data } = await axios.get(
                "/api/file/" + this.$route.params.id
            );
            this.file = data;
        }

        const that = this;
        const videoInstance = videojs(
            "videoPlayer",
            window.videoOptions(this.file),
            function() {
                that.player = this;
                this.on("play", () => (that.playing = true));
                this.on("pause", () => (that.playing = false));
                this.on("ended", () => (that.playing = false));
            }
        );

        Bus.$off("togglePlayback");
        Bus.$on("togglePlayback", () => {
            if (this.playing) {
                videoInstance.pause();
                this.playing = false;
            } else {
                videoInstance.play();
                this.playing = true;
            }
        });
    }
};
</script>