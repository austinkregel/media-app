<template>
    <div>
        <genre-list></genre-list>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log("thing", document.getElementById("container").offsetWidth);
    }
};
</script>