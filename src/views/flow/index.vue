<template>
  <div class="flow">

    <!-- S aside -->
    <aside class="flow__aside">
      <div class="flow__name">
        <h3>Flow</h3>
        <i class="el-icon-plus" @click="handleAddPage"></i>
      </div>
      <div class="flow__tree">
        <el-tree :data="source" :props="treeProps" @node-click="handleNodeClick"></el-tree>
      </div>
    </aside>
    <!-- E aside -->

    <!-- S page content -->
    <section class="flow__page" v-if="activePage">
      <div class="flow__header">
        <div class="flow__info">
          <input
            type="text"
            name="title"
            placeholder="标题"
            autocomplete="off"
            class="flow__title"
            v-model="activePage.title"
            @input="handleUpdatePage"
          >
          <input
            type="text"
            name="desc"
            placeholder="描述"
            autocomplete="off"
            class="flow__desc"
            v-model="activePage.desc"
            @input="handleUpdatePage"
          >
        </div>
        <div>
          <i class="el-icon-close flow__close" @click="handleRemovePage"></i>
          <i class="el-icon-plus flow__close" @click="handleAddRecord"></i>
        </div>
      </div>
      <!-- / page header -->

      <div class="flow__content">
        <record-card
          v-for="(record, index) of records"
          :key="record.id"
          :index="index + 1"
          :data="record"
        />
      </div>
      <!-- / page content -->

      <div class="flow__actions" v-if="activePage?.children.length > 0">
        <el-button type="primary" icon="el-icon-top" circle></el-button>
        <el-button type="primary" icon="el-icon-bottom" circle></el-button>
      </div>
      <!-- / page actions -->

    </section>
    <!-- E page content -->

    <!-- S none page -->
    <section class="flow__none" v-else>
      <i class="el-icon-files"></i>
      <p>暂无数据</p>
    </section>
    <!-- E none page -->

  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import MutationTypes from '@/store/mutation-types'
import Page from '@/models/Page'
import Record from '@/models/Record'
import { useMutations } from '@/utils'
import RecordCard from '@/components/RecordCard'

export default {
  name: 'Flow',
  components: {
    RecordCard
  },
  setup () {
    const store = useStore()

    const [
      addPage, setActivePage, updatePage, removePage,
      addRecord
    ] = useMutations([
      MutationTypes.ADD_PAGE,
      MutationTypes.SET_ACTIVE_PAGE,
      MutationTypes.UPDATE_PAGE,
      MutationTypes.REMOVE_PAGE,
      MutationTypes.ADD_RECORD
    ])

    const state = reactive({
      source: computed(() => store.state.source),
      activePage: computed(() => cloneDeep(store.state.activePage)),
      records: computed(() => store.state.activePage?.children),
      treeProps: {
        children: 'children',
        label: 'title'
      }
    })

    const methods = reactive({
      handleAddPage: () => {
        const page = new Page({})
        addPage({ page })
        setActivePage({ id: page.id })
      },
      handleNodeClick: (node) => {
        if (node.type === 'PAGE') {
          setActivePage({ id: node.id })
        }
      },
      handleUpdatePage: () => {
        updatePage({ id: state.activePage.id, page: state.activePage })
      },
      handleRemovePage: () => {
        removePage({ id: state.activePage.id })
        setActivePage()
      },
      handleAddRecord: () => {
        const record = new Record({})
        addRecord({ record })
      }
    })

    return {
      ...toRefs(state),
      ...toRefs(methods)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/theme';

.flow {
  display: flex;
  flex-flow: row nowrap;
  height: 100vh;
  width: 100%;
  overflow: auto;

  &__aside {
    width: 240px;
    background: white;
  }

  &__page {
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: auto;
  }

  &__header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 12px 64px;
    margin-bottom: 16px;
  }

  &__info {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    input {
      background: transparent;
      border: none;
      outline: none;
    }
  }

  &__close {
    font-size: 24px;
    cursor: pointer;
  }

  &__name {
    flex: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    box-sizing: border-box;
    padding: 0 16px;

    h3 {
      color: $primary-dark;
    }

    i {
      font-size: 16px;
      cursor: pointer;
    }
  }

  &__tree {
    height: calc(100vh - 56px);
    box-sizing: border-box;
    padding: 16px;
  }

  &__title {
    color: $primary;
    font-size: 24px;
    font-weight: bold;
    margin: 12px 0;
  }

  &__desc {
    color: #2c3e50;
    font-size: 14px;
    margin: 0;
  }

  &__none {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-content: center;
    width: 100%;

    i {
      font-size: 64px;
    }
  }

  &__content {
    min-height: calc(100vh - 121px);
    box-sizing: border-box;
    padding: 0 48px;
  }

  &__actions {
    position: fixed;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    height: 150px;
    width: 56px;
    z-index: 1;
    top: calc(50% - 75px);
    right: 24px;

    button {
      font-size: 18px;
      border: none;
      box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%);
    }
  }
}
</style>
