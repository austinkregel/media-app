<template>
    <div class="w-full h-16 bg-indigo-700">
        <div class="flex flex-wrap w-full">
            <div class="max-w-x w-2/5">
                <div class="py-2 px-4 relative text-indigo-400 focus-within:text-blue-500 placeholder-indigo-500">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-8">
                        <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/></svg>
                    </span>
                    <input v-model="search" placeholder="The pirates of the car..." class="placeholder-indigo-500 block w-full rounded-full pl-12 pr-5 py-2 text-lg border-2 border-transparent focus:border-blue-500 shadow focus:outline-none" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return { 
                search: ''
            }
        },
        watch: {
            search(newVal, oldVal) {
                if (newVal) {
                    this.$router.push('/search?q=' + this.search);
                    Bus.$emit('search')
                }
            }
        }
    }
</script>