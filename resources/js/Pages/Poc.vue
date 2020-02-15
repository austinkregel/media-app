<template>
    <div class="mx-4">
        <div class="flex flex-wrap w-full">
            <div class="w-2/5 font-semibold pt-4 pb-2">NAME</div>
            <div class="w-1/5 font-semibold pt-4 pb-2">RATING</div>
            <div class="w-1/5 font-semibold pt-4 pb-2">RUNTIME</div>
            <div class="w-1/5 font-semibold pt-4 pb-2">REVENUE</div>
        </div>
        <div
            v-for="(filesInGroup, key) in groupedFiles"
            class="flex flex-wrap w-full mt-4"
            v-if="filesInGroup.length !== 0"
        >
            <div class="text-lg font-bold">{{ key }}</div>
            <div v-for="file in filesInGroup" class="flex flex-wrap w-full bg-white py-2 px-4">
                <div class="w-2/5">
                    <router-link
                        :to="'/watch/' + getFile(file.files).hash"
                        class="underline text-blue-700"
                    >{{ getFile(file.files).name }}</router-link>
                </div>
                <div class="w-1/5">{{ file.rating }}/10</div>
                <div class="w-1/5">{{ file.runtime }} minutes</div>
                <div
                    class="w-1/5"
                    v-if="file.revenue != 0"
                >${{ parseInt(file.revenue).toLocaleString() }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            files: this.$store.getters.files
        };
    },
    computed: {
        groupedFiles() {
            var regex = /^[a-zA-Z0-9]*$/;
            return this.files.reduce(
                function(acc, curr) {
                    let firstChar = curr.name.charAt(0).toUpperCase();
                    let isSpecial = regex.test(firstChar);

                    if (!isSpecial) {
                        acc["SPECIAL"].push(curr);
                    } else if (acc.hasOwnProperty(firstChar)) {
                        acc[firstChar].push(curr);
                    } else {
                        acc[firstChar] = [curr];
                    }
                    return acc;
                },
                {
                    SPECIAL: [],
                    A: [],
                    B: [],
                    C: [],
                    D: [],
                    E: [],
                    F: [],
                    G: [],
                    H: [],
                    I: [],
                    J: [],
                    K: [],
                    L: [],
                    M: [],
                    N: [],
                    O: [],
                    P: [],
                    Q: [],
                    R: [],
                    S: [],
                    T: [],
                    U: [],
                    V: [],
                    W: [],
                    X: [],
                    Y: [],
                    Z: []
                }
            );
        }
    },
    methods: {
        getFile(files) {
            return Object.values(
                files.sort((a, b) => (a.bytes > b.bytes ? 1 : -1))
            )[0];
        }
    }
};
</script>