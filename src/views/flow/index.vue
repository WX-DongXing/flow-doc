<template>
  <div class="flow">
    <section class="flow__section">
      <header>
        <input type="text" name="title" value="flow" class="flow__title">
        <input type="text" name="subtitle" value="doc" class="flow__subtitle">
      </header>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Flow'
}
</script>

<style scoped lang="scss">
.flow {
  height: 100vh;
  width: 100%;
  overflow: auto;

  section {
    height: 100vh;
    width: 100%;
  }

  header {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 12px 120px;

    input {
      background: transparent;
      border: none;
      outline: none;
    }
  }

  &__title {
    color: #409EFF;
    font-size: 24px;
    font-weight: bold;
    margin: 12px 0;
  }

  &__subtitle {
    color: #2c3e50;
    font-size: 14px;
    margin: 0;
  }
}
</style>
