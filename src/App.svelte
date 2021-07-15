<script>
	import wretch from 'wretch';
	import {onMount} from 'svelte';

	onMount(() => {
		console.log(mounted);
	});
</script>

<div class="image-container" style="background-image: url(images/broad-city-logo-5.png);">
		<h4 style="color: #d1d1d1;">Yaaaaas</h4>
</div>


<style>
	.image-container {
		background-size: cover;
		display: flex;
		align-content: center;
		justify-content: center;
	}
</style>