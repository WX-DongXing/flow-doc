<template>
  <aside>
    <i class="el-icon-bangzhu logo"></i>

    <div class="menu">
      <el-tooltip effect="dark" content="文档" placement="right">
        <router-link to="/" class="menu__item">
          <i class="el-icon-reading"></i>
        </router-link>
      </el-tooltip>
      <el-tooltip effect="dark" content="历史" placement="right">
        <router-link to="/history" class="menu__item">
          <i class="el-icon-timer"></i>
        </router-link>
      </el-tooltip>
    </div>
  </aside>

  <main class="main">
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

aside {
  flex: none;
  height: 100vh;
  width: 56px;
  background: #fafdfe;
  border-right: 1px solid #e6e6e6;

  i {
    font-size: 24px;
    color: #2c3e50;
  }

  .logo {
    margin-top: 16px;
  }

  .menu {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-top: 24px;

    &__item {
      height: 56px;
      width: 100%;
      cursor: pointer;
      line-height: 56px;
      text-decoration: none;

      &:hover {
        background: #ecf5ff;
      }

      &.router-link-exact-active i {
        color: #409EFF;
      }
    }
  }
}

main {
  height: 100vh;
  width: 100%;
  background: #f2f5f7;
}
</style>
