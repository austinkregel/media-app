<style scoped>

</style>

<template>
    <li>
        <router-link
                :to="link"
                :aria-selected="selected"
                class="py-2 px-4 w-full flex items-center focus:outline-none focus-visible:underline"
        >
            <zondicon :icon="icon" :class="selected ? 'text-indigo-600' : 'text-gray-200'" class="h-6 w-6 pl-1 fill-current transition-all ease-out transition-medium"/>

            <span :class="selected ? 'text-indigo-500' : 'text-gray-200'"
                class="ml-2 text-sm font-thin transition-all ease-out transition-medium"
            >
                {{ name }}
            </span>
        </router-link>
    </li>
</template>

<script>
    export default {
        props: {
            icon: {
                type: String,
                default: 'code'
            },
            link: {
                type: String,
                default: "0",
            },
            name: {
                type: String,
                default: 'Unnamed Component'
            }
        },
        computed: {
            selected() {
                return this.$route.path === this.link
            }
        }
    }
</script>