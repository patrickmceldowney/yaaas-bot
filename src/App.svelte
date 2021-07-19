<script>
  import { onMount } from 'svelte';
  import LiquidButton from './components/LiquidButton/LiquidButton.svelte';
  import jQuery from 'jquery';
  import { quotes } from './quotes';

  let loaded = false;

  onMount(() => {
    loaded = true;
  });
</script>

{#if loaded}
  <div class="container">
    <img src="images/broad-city.gif" alt="yaaaas" class="yaaas" />
    <LiquidButton
      on:liquidClick={() => {
        let ran = quotes[Math.floor(Math.random() * quotes.length)];
        jQuery('.random-quote').html(ran);
      }}
    />
    <h2 class="random-quote">Smack that button for quotes!</h2>
  </div>
{/if}

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: fit-content;
    width: fit-content;
    padding: 20px;
  }

  .container .yaaas {
    width: 70%;
    height: auto;
  }

  .container .random-quote {
    margin-top: 60px;
    color: #fff;
    white-space: pre-wrap;
  }
</style>
