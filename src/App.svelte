<script>
  import { onMount, onDestroy } from 'svelte';
  import LiquidButton from './components/LiquidButton/LiquidButton.svelte';
  import jQuery from 'jquery';
  import { quotes } from './quotes';

  let loaded = false,
    alreadyShown = [];

  const getRandomQuote = () => {
    if (!alreadyShown.length) {
      for (let i = 0; i < quotes.length; i++) {
        alreadyShown.push(i);
      }
    }

    // Generate random number within the range of length of alreadyShown array.
    let randomIndex = Math.floor(Math.random() * alreadyShown.length);

    // Get unaccessed index of quotes using randomIndex
    let indexOfItem = alreadyShown[randomIndex];

    // remove this index from alreadyShown array
    alreadyShown.splice(randomIndex, 1);
    return quotes[indexOfItem];
  };

  onMount(() => {
    loaded = true;
  });

  onDestroy(() => {
    alreadyShown = [];
  });
</script>

{#if loaded}
  <div class="container">
    <img src="images/broad-city.gif" alt="yaaaas" class="yaaas" />
    <LiquidButton
      on:liquidClick={() => {
        let ran = getRandomQuote();
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
    font-weight: 400;
  }
</style>
