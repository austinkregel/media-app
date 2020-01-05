<template>
    <div class="w-full">
        <div v-for="(files, $i) in chunk" class="flex flex-wrap overflow-hidden">
            <media
                v-for="file in files"
                :key="file.id"
                :activation-key="activationKey"
                :class="width"
                :file="file"
            ></media>
        </div>
        <div v-if="active" class="py-16 m-0 bg-indigo-500 flex flex-wrap w-full relative">
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
                    <div
                        class="text-sm"
                    >{{ file.rating }}/10 • {{ file.runtime }} minutes • {{ size }}</div>
                    <div class="text-base">{{ file.plot }}</div>
                    <div class="text-base">{{ file.file_path }}</div>
                    <div class="mt-4" v-if="fileObject">
                        <router-link
                            :to="'/watch/' + fileObject.hash"
                            class="py-1 px-4 border border-orange-500 focus:outline-none hover:bg-orange-500 hover:text-orange-100 text-orange-200 font-bold rounded"
                        >Start watching</router-link>
                    </div>
                    {{ fileObject.hash }}
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
        },
        filesKey: {
            default: "1"
        },
        chunkWith: {
            default: null
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
                return "0 MBs";
            }

            return Math.round(this.fileObject.size * 100) / 100 + " MBs";
        },
        fileObject() {
            return Object.values(
                this.file.files.sort((a, b) => (a.bytes > b.bytes ? 1 : -1))
            )[0];
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
            if (this.chunkWith) {
                return this.chunkWith(this.files);
            }
            const chunked_arr = [];
            let index = 0;
            while (index < this.files.length) {
                chunked_arr.push(this.files.slice(index, this.calculatedWidth));
                index += this.calculatedWidth;
            }
            return chunked_arr;
        },
        activationKey() {
            return "activate." + this.filesKey;
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
        Bus.$off(this.activationKey);
        Bus.$on(this.activationKey, file => {
            this.$store.commit("setFiles", { files: this.files });
            axios.get("/api/files/" + file.id).then(({ data }) => {
                console.log(data);
                this.$store.commit("setMedia", { media: data });
                this.file = data;
                this.active = true;
            });
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