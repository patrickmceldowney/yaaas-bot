<script>
  import { onMount, onDestroy } from 'svelte';
  import LiquidButton from './components/LiquidButton/LiquidButton.svelte';
  import jQuery from 'jquery';
  import { quotes } from './quotes';

  let loaded = false,
    alreadyShown = [],
    name = '',
    text = '',
    replies = [],
    quoteRetrieved = false;

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
        name = ran.name;
        text = ran.text;
        replies = ran.replies;
        quoteRetrieved = true;
      }}
    />
    <div class="quote-wrapper">
      {#if !quoteRetrieved}
        <h2 class="random-quote">Smack that button for quotes!</h2>
      {:else}
        <h2 class="random-quote">
          <span class="author">{name}:</span>
          {text}
        </h2>
        {#each replies as reply}
          <h2 class="random-quote">
            <span class="author">{reply.name}:</span>
            {reply.text}
          </h2>
        {/each}
      {/if}
    </div>
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

  .container .quote-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
    border-radius: 8px;
    margin: 60px 0;
    background: rgb(44, 201, 65);
    background: radial-gradient(
      circle,
      rgba(44, 201, 65, 1) 0%,
      rgba(17, 150, 209, 1) 60%,
      rgba(255, 75, 178, 1) 100%
    );
  }

  .quote-wrapper .random-quote {
    margin: 0;
    color: #fff;
    font-weight: 400;
  }

  .author {
    color: #2cc941;
  }
</style>
