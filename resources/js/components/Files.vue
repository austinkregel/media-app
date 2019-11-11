<template>
    <div class="flex flex-wrap">
        <div v-for="file in files" :key="file.id" class="w-48">
            <div class="p-4">
                <a class="block text-gray-700 p-0 text-sm" :href="'/player/' + file.id"><img :src="file.poster" :alt="file.name" class="w-full hover:border-orange-500 border-2 p-0 m-0 border-transparent"></a>
                <div class="leading-tight">
                    <a class="block text-gray-700 p-0 text-sm" :href="'/player/' + file.id">{{ file.normalized_name ? file.normalized_name : file.name}}</a>
                    <span class="text-xs text-gray-600">{{ Math.round(file.size) }} MBs</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return { 
                files: [],
                Math
            }
        },
        async mounted () {
            const { data } = await axios.get('/api/files');

            this.files = data;
        }
    }
</script>