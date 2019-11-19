<style scoped>
.hover:hover > a {
    display: block;
}
.hover > a {
    display: none;
}
</style>
<template>
    <div class="p-4">
        <button
            @click="activate"
            class="block text-gray-700 p-0 text-sm overflow-hidden rounded-lg shadow hover:shadow-lg transition-all focus:outline-none relative"
        >
            <div class="relative hover">
                <img
                    :src="file.poster"
                    :alt="file.name"
                    class="h-64 mb-12p-0 m-0 overflow-hidden rounded-lg"
                />
                <a
                    :href="'/watch/' + file.files[0].hash"
                    class="w-full h-full absolute top-0 left-0"
                    style="background: rgba(0,0,0,0.4);"
                >
                    <svg
                        class="fill-current text-orange-500 w-8 h-8 mt-24 ml-16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM7 6l8 4-8 4V6z"
                        />
                    </svg>
                </a>
            </div>

            <div class="absolute left-0 right-0 bottom-0 mb-12 z-10">
                <span
                    class="bg-orange-500 rounded-full py-1 px-2 text-white font-bold"
                >{{ file.rating }}</span>
            </div>
            <div class="absolute left-0 right-0 bottom-0 bg-white text-left p-2">
                <div
                    class="font-bold truncate"
                >{{ file.normalized_name ? file.normalized_name : file.name}}</div>
                <div class="font-thin text-gray-700 truncate text-sm">{{ genres }}</div>
            </div>
        </button>
    </div>
</template>

<script>
export default {
    props: ["file", "activationKey"],
    data() {
        return {
            Math,
            active: false
        };
    },
    computed: {
        genres() {
            if (!this.file) {
                return "No file";
            }

            if (!this.file.genres) {
                return "No genres";
            }
            if (this.file.genres.length === 0) {
                return "No attached genres";
            }

            return this.file.genres.map(genre => genre.name).join(", ");
        }
    },
    methods: {
        activate() {
            Bus.$emit(this.activationKey, this.file);
        }
    }
};
</script>