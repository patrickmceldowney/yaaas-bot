<script>
  import browser from 'webextension-polyfill';
  import LiquidButton from './components/LiquidButton/LiquidButton.svelte';

  let image = 'images/broad-city-logo-5.png';
</script>

<div class="container">
  <img src="images/broad-city.gif" alt="yaaaas" class="yaaas" />
  <LiquidButton
    on:liquidClick={() => {
      browser.storage.local.set({ background: image });
    }}
  />
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 500px;
    width: 500px;
  }

  .container .yaaas {
    width: 65%;
    height: 65%;
  }
</style>
