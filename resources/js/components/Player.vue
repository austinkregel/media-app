<template>
    <video id="videoPlayer" controls class="w-full shadow">  
        <source :src="'/api/media/'+file.id" type="video/mp4">
    </video>
</template>

<script>
export default {
    props:[ 'file']
}
</script>