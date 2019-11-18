<template>
    <div>
        <files :files="files"></files>
    </div>
</template>

<script>
export default {
    data() {
        return {
            files
        };
    },
    computed: {
        query() {
            return this.$route.query.q;
        }
    },
    mounted() {
        Bus.$off("search");
        Bus.$on("search", async () => {
            let {
                data: { data: files }
            } = await axios.get("/api/search/" + this.query);

            this.files = files;
            this.$store.commit("setFiles", files ? { files } : {});
        });
    }
};
</script>