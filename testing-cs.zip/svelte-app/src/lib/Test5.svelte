<script lang="ts">
  let backgroundColor: string = '#f0f8ff';
  let textColor: string = '#2c3e50';
  let showBorder: boolean = true;
  let fontSize: number = 16;
  let paddingValue: number = 15;
  let message: string = 'Welcome to the dynamic content area!';
  let highlightActive: boolean = false;

  function resetStyles() {
    backgroundColor = '#f0f8ff';
    textColor = '#2c3e50';
    showBorder = true;
    fontSize = 16;
    paddingValue = 15;
    highlightActive = false;
  }

  function toggleHighlight() {
    highlightActive = !highlightActive;
    if (highlightActive) {
      backgroundColor = '#fffacd';
      textColor = '#8b8000';
    } else {
      resetStyles();
    }
  }
</script>

<div
  class="content-wrapper"
  style="
    background-color: {backgroundColor};
    color: {textColor};
    border: {showBorder ? '1px solid #ccc' : 'none'};
    padding: {paddingValue}px;
    font-size: {fontSize}px;
    margin: 20px auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    max-width: 700px;
    text-align: center;
  "
>
  <h2 style="color: {textColor}; font-weight: bold;">{message}</h2>

  <p style="
    line-height: 1.6;
    margin-bottom: 20px;
    font-style: {highlightActive ? 'italic' : 'normal'};
    text-shadow: {highlightActive ? '1px 1px 2px rgba(0,0,0,0.1)' : 'none'};
  ">
    This block demonstrates various ways to apply styles directly within the template.
    It's important to keep visual presentation separate from component logic for maintainability.
  </p>

  <div class="controls" style="
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
    border-top: 1px dashed #eee;
    padding-top: 15px;
  ">
    <button on:click={() => (fontSize += 2)} style="background-color: #28a745; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">
      Increase Font
    </button>
    <button on:click={() => (paddingValue += 5)} style="background-color: #007bff; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">
      More Padding
    </button>
    <button on:click={toggleHighlight} style="background-color: #ffc107; color: #333; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">
      Toggle Highlight
    </button>
    <button on:click={resetStyles} style="background-color: #6c757d; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">
      Reset Styles
    </button>
  </div>

  {#if highlightActive}
    <p style="margin-top: 20px; color: #8b8000; font-weight: bold;">Content is currently highlighted for emphasis.</p>
  {/if}
</div>

<style>
  .content-wrapper button:hover {
    opacity: 0.9;
  }
</style>
