<template>
  <div class="record-card">
    <div class="record-card__content">
      <div class="record-card__board" ref="board"></div>
    </div>
    <footer class="record-card__footer">
      <div class="record-card__info">
        <h3>{{ recordNo }}</h3>
        <div class="record-card__inputs">
          <input
            type="text"
            name="title"
            placeholder="标题"
            autocomplete="off"
            v-model="record.title"
            @input="handleUpdateRecord"
          >
          <input
            type="text"
            name="desc"
            placeholder="描述"
            autocomplete="off"
            v-model="record.desc"
            @input="handleUpdateRecord"
          >
        </div>
      </div>
      <div class="record-card__actions">
      </div>
    </footer>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { computed, reactive, toRefs, onMounted } from 'vue'
import { Graph } from '@antv/x6'
import { useMutations } from '@/utils'
import MutationTypes from '@/store/mutation-types'

export default {
  name: 'RecordCard',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 1
    }
  },
  setup (props) {
    const { data, index } = toRefs(props)

    const [updateRecord] = useMutations([
      MutationTypes.UPDATE_RECORD
    ])

    const state = reactive({
      board: null,
      graph: {},
      record: computed(() => cloneDeep(data.value)),
      recordNo: computed(() => index)
    })

    const methods = reactive({
      handleUpdateRecord: () => {
        updateRecord({ id: data.value.id, record: state.record })
      }
    })

    onMounted(() => {
      state.graph = new Graph({
        container: state.board,
        autoResize: true,
        grid: true
      })
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

.record-card {
  width: 100%;
  height: calc(100vh - 169px);
  border-radius: 4px;
  background: rgba(255, 255, 255, .8);
  box-shadow: 0 16px 48px #e7ebf6;
  margin-bottom: 24px;

  &__content {
    display: flex;
    height: calc(100vh - 233px);
    box-sizing: border-box;
    padding: 16px;
  }

  &__board {
    flex: 1;
    height: 100%;
    width: 100%;
  }

  &__footer {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    height: 64px;
    background: $primary-light;
    border-radius: 4px;
  }

  &__info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 0 16px;

    h3 {
      font-size: 36px;
      font-weight: normal;
      margin: 0;
    }
  }

  &__inputs {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: flex-start;
    margin: 0 16px;

    input {
      background: transparent;
      border: none;
      outline: none;

      &:nth-of-type(1) {
        font-size: 16px;
      }

      &:nth-of-type(2) {
        font-size: 12px;
        color: $grey;
      }
    }
  }
}
</style>
