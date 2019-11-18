<template>
    <div class="p-4">
        <button
            @click.prevent="activate"
            class="block text-gray-700 p-0 text-sm overflow-hidden rounded-lg shadow hover:shadow-lg transition-all focus:outline-none relative"
        >
            <img
                :src="file.poster"
                :alt="file.name"
                class="h-64 mb-12 p-0 m-0 overflow-hidden rounded-lg"
            />

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
    props: ["file"],
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
            Bus.$emit("activate", this.file);
        }
    }
};
</script>