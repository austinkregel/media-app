<template>
    <div>
        <div v-for="(files, $i) in chunk" :key="$i" class="flex flex-wrap overflow-hidden">
            <media v-for="file in files" :key="file.id" :class="width" :file="file"></media>
            <div
                v-if="active && ($i % calculatedWidth) === 0"
                class="py-16 m-0 bg-indigo-500 flex flex-wrap w-full relative"
            >
                <button
                    class="absolute top-0 right-0 cursor-pointer focus:outline-none"
                    @click.prevent="close"
                >
                    <zondicon icon="close" class="fill-current m-4 w-4 h-4"></zondicon>
                </button>
                <div class="mx-auto w-full md:w-2/3 flex items-center">
                    <img :src="file.backdrop" :alt="file.name" class="h-56" />
                    <div class="ml-8 text-indigo-100">
                        <input
                            @keydown.enter="updateFile"
                            v-model="file.name"
                            class="text-2xl w-full font-bold bg-indigo-500 underline"
                        />
                        <div class="text-sm">{{ file.rating }} • {{ file.runtime }} • {{ size }}</div>
                        <div class="text-base">{{ file.plot }}</div>
                        <div class="text-base">{{ file.file_path }}</div>
                        <div class="mt-4" v-if="file.files">
                            <router-link
                                :to="'/watch/' + file.files[0].hash"
                                class="py-1 px-4 border border-orange-500 focus:outline-none hover:bg-orange-500 hover:text-orange-100 text-orange-200 font-bold rounded"
                            >Start watching</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        files: {
            default: []
        }
    },
    data() {
        return {
            Math,
            active: false,
            file: null,
            widthValue: 1600
        };
    },
    computed: {
        size() {
            if (!this.file) {
                return 0;
            }

            return Math.round(this.file.size * 100) / 100 + " MBs";
        },
        calculatedWidth() {
            let widthOfMovie = 192;
            let width = Math.floor(
                Math.floor(this.widthValue / widthOfMovie),
                6
            );
            return width;
        },
        width() {
            switch (this.calculatedWidth) {
                case 14:
                case 13:
                case 12:
                case 11:
                case 10:
                case 9:
                case 8:
                    return "w-1/8";
                case 7:
                    return "w-1/7";
                case 6:
                    return "w-1/6";
                case 5:
                    return "w-1/5";
                case 4:
                    return "w-1/4";
                case 3:
                    return "w-1/3";
                case 2:
                    return "w-1/2";
                default:
                    return "w-full";
            }
        },
        chunk() {
            const chunked_arr = [];
            let index = 0;
            while (index < this.$store.getters.files.length) {
                chunked_arr.push(
                    this.$store.getters.files.slice(index, this.calculatedWidth)
                );
                index += this.calculatedWidth;
            }
            return chunked_arr;
        }
    },
    methods: {
        updateFile() {
            axios
                .put("/api/files/" + this.file.id, this.file)
                .then(({ data }) => {
                    this.file = data;
                    this.file.normalized_name =
                        this.file.normalized_name || this.file.name;
                    Bus.$emit("refresh:list");
                });
        },
        close() {
            this.file = null;
            this.active = false;
        }
    },
    async mounted() {
        Bus.$on("activate", file => {
            this.file = file;
            this.active = true;
        });

        const resize = () => {
            console.log(
                "thing",
                document.getElementById("container").offsetWidth
            );
            this.widthValue = document.getElementById("container").offsetWidth;
        };

        resize.bind(this);
        window.onresize = resize;
    }
};
</script>