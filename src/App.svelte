<script>
	import browser from 'webextension-polyfill';

	let image = 'https://fanart.tv/fanart/tv/275557/hdtvlogo/broad-city-5341ed4f4ff19.png';

	function change() {
		browser.storage.local.set({ background: image });
	}
</script>

<div class="image-container">
	<img src="images/broad-city.gif" alt="yaaaas">
</div>


<style>
	.image-container {
		display: flex;
		align-content: center;
		justify-content: center;
	}
</style>