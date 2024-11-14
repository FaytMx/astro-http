<template>
    <div v-if="isLoading">
        Loading...
    </div>

    <button v-else-if="likeCount === 0" @click="likePost">Like this post</button>
    <button v-else @click="likePost">
        Likes
        <span>{{ likeCount }}</span>
    </button>
</template>

<script lang="ts" setup>
import { actions } from 'astro:actions';
import { ref, watch } from 'vue';
import confetti from 'canvas-confetti';
import debounce from 'lodash.debounce';

interface Props {
    postId: string;
}

const props = defineProps<Props>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch(likeCount, debounce(async () => {

    actions.updateLikes({
        postId: props.postId,
        increment: likeCount.value
    });
    likeClicks.value = 0;

}, 500));



const likePost = () => {
    likeCount.value++;
    likeClicks.value++;

    confetti({
        particleCount: 100,
        spread: 70,
        origin: {
            x: Math.random(),
            y: Math.random() - 0.2
        }
    });
}

const getCurrentLikes = async () => {

    const { data, error } = await actions.getPostLikes(props.postId);

    if (error) {
        console.error('Failed to fetch likes');
        return;
    }

    likeCount.value = data.likes;
    isLoading.value = false;
}

getCurrentLikes();
</script>

<style scoped>
button {
    background-color: #5e51bc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background-color: #4a3f9a;
}
</style>