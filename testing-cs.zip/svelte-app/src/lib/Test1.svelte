<script>
  import { writable, derived } from 'svelte/store';
  import { onDestroy } from 'svelte';

  export let initialCount = 0;
  export let label = "Counter";
  export let options = { step: 1, limit: 100 };

  const count = writable(initialCount);

  const status = derived(count, ($count) => {
    console.log(`Derived status recalculating for count: ${$count}`);
    expensiveCheck($count);
    return $count > 50 ? 'High' : 'Low';
  });

  let currentStatus = '';
  const unsubscribeStatus = status.subscribe((value) => {
    console.log(`ReactiveCounter component observing status: ${value}`);
    currentStatus = value;
  });

  onDestroy(unsubscribeStatus);

  function increment() {
    count.update(n => Math.min(n + options.step, options.limit));
  }

  const logCurrentState = () => {
    console.log(`Current state: ${$count}, Status: ${currentStatus}`);
  };

  function expensiveCheck(value) {
    console.log(`Running expensiveCheck for ${value}`);
    for (let i = 0; i < 100000; i++) {}
    return value;
  }
</script>

<div class="reactive-counter-card">
  <h3>{label}</h3>
  <p>Count: {$count}</p>
  <p>Status: {currentStatus}</p>
  <button on:click={increment}>Increment by {options.step}</button>
  <button on:click={logCurrentState}>Log State</button>
</div>

<style>
  .reactive-counter-card {
    border: 1px solid #ff3e00;
    padding: 20px;
    margin: 15px;
    border-radius: 8px;
    background-color: #fff0ed;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  h3 { color: #ff3e00; }
  p { margin: 5px 0; }
  button {
    background-color: #ff3e00; 
    color: white; 
    border: none;
    padding: 8px 12px; 
    border-radius: 5px; 
    cursor: pointer;
    margin-top: 10px; 
    margin-right: 10px;
  }
</style>
