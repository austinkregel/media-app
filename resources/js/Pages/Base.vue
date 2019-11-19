<template>
    <div class="flex w-full">
        <div class="w-full bg-indigo-600" style="max-width: 300px;">
            <div class="antialiased min-h-screen p-8">
                <div class="flex justify-center">
                    <nav id="nav" class="w-56 relative">
                        <router-link to="/dashboard" class="mb-8 block flex items-center">
                            <div
                                class="font-bold text-xl text-white font-ubuntu flex flex-col mx-auto items-center"
                            >
                                <zondicon
                                    icon="mobile-devices"
                                    class="w-16 h-16 fill-current text-white"
                                />
                                <div class="mt-4 text-2xl">Fullscreen</div>
                            </div>
                        </router-link>
                        <span
                            v-if="selectedIndex !== -1"
                            class="absolute h-10 w-full bg-white rounded-lg shadow ease-out transition-transform transition-medium"
                            :style="{ transform: `translateY(calc(100% * ${selectedIndex}))` }"
                        ></span>
                        <ul class="relative" ref="links" id="links">
                            <item name="Dashboard" link="/dashboard" icon="book-reference" />
                            <item name="Discover" link="/discover" icon="hot" />
                            <item name="Library" link="/library" icon="library" />
                            <item name="Settings" link="/settings" icon="wrench" />
                            <li v-if="indexing">
                                <zondicon
                                    icon="radar"
                                    class="fill-current text-green-dark w-16 h-16 rotate mx-auto"
                                ></zondicon>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <div class="flex-grow" id="container">
            <top-nav-bar></top-nav-bar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        activeClasses: "border-l-4 border-teal-500",
        selectedIndex: 0,
        indexing: 0
    }),
    mounted() {
        socket.on("command:index", value => {
            this.indexing = value;
        });
        Bus.$on("refresh:list", async () => {
            if (this.$route.query.q) {
                Bus.$emit("search");
            } else {
                const {
                    data: { data }
                } = await axios.get("/api/files?limit=100000");
                this.$store.commit("setFiles", { files: data });
            }
            this.$forceUpdate();
        });
        Bus.$emit("refresh:list");

        Bus.$on("refresh:genres", async () => {
            if (this.$route.query.q) {
                Bus.$emit("search");
            } else {
                const {
                    data: { data }
                } = await axios.get("/api/genres");
                this.$store.commit("setGenres", { genres: data });
            }
            this.$forceUpdate();
        });
        Bus.$emit("refresh:genres");

        this.$router.afterEach(() => {
            let changed = false;
            $(this.$refs.links)
                .children("li")
                .each((i, listElement) => {
                    let linkText = $($(listElement).children("a")[0])
                        .attr("href")
                        .replace("#", "");
                    if (this.$route.path === linkText) {
                        this.selectedIndex = i;
                        changed = true;
                    }
                });
            if (!changed) {
                this.selectedIndex = -1;
            }
        });
    }
};
</script>