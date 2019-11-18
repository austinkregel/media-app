<template>
    <div v-if="file" class="m-4">
        <div class="w-full flex flex-wrap">
            <img class="w-48" :src="file.poster" :alt="file.normalized_name" />
            <div class="pl-4 flex flex-col w-4/5">
                <input
                    @keydown.enter="updateFile"
                    v-model="file.normalized_name"
                    class="text-2xl w-full font-bold bg-gray-200 underline"
                />
                <div
                    class="text-sm text-gray-700"
                >{{ file.rating }} • {{ file.runtime }} • {{ size }}</div>
                <div class="text-sm">{{ file.plot }}</div>
                <div class="text-sm">IMDB {{ file.imdbRating }}/10</div>
            </div>
        </div>
        <pre>{{ {fileName, file } }}</pre>
    </div>
</template>

<script>
export default {
    data() {
        return {
            file: false
        };
    },
    created() {
        axios
            .get("/api/files/" + this.$route.params.id)
            .then(({ data: file }) => (this.file = file));
    },
    methods: {
        updateFile() {
            axios
                .put("/api/files/" + this.file.id, this.file)
                .then(({ data }) => {
                    this.file = data;
                    this.file.normalized_name =
                        this.file.normalized_name || this.file.name;
                });
        }
    },
    computed: {
        data() {
            return this.$route.params;
        },
        size() {
            if (!this.file) {
                return 0;
            }

            return Math.round(this.file.size * 100) / 100 + " MBs";
        },
        fileName() {
            return torrentNameFix(this.file.name);
        }
    }
};
</script>