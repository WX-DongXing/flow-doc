import { Graph, Node } from '@antv/x6'

export class FnGroup extends Node {
  isCollapsed () {
    return this.collapsed
  }

  toggleCollapse (collapsed) {
    const target = collapsed == null ? !this.collapsed : collapsed
    if (target) {
      this.attr('buttonSign', { d: 'M 1 5 9 5 M 5 1 5 9' })
      this.expandSize = this.getSize()
      this.resize(180, 36)
    } else {
      this.attr('buttonSign', { d: 'M 2 5 8 5' })
      if (this.expandSize) {
        this.resize(this.expandSize.width, this.expandSize.height)
      }
    }
    this.collapsed = target
  }

  postprocess () {
    this.toggleCollapse()
  }
}

FnGroup.config({
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'text',
      selector: 'label'
    },
    {
      tagName: 'g',
      selector: 'buttonGroup',
      children: [
        {
          tagName: 'rect',
          selector: 'button',
          attrs: {
            'pointer-events': 'visiblePainted'
          }
        },
        {
          tagName: 'path',
          selector: 'buttonSign',
          attrs: {
            fill: 'none',
            'pointer-events': 'none'
          }
        }
      ]
    }
  ],
  attrs: {
    body: {
      rx: 4, // 圆角矩形
      ry: 4,
      refWidth: '100%',
      refHeight: '100%',
      strokeWidth: 1,
      fill: 'white',
      stroke: '#5f32c9'
    },
    buttonGroup: {
      refX: 8,
      refY: 10
    },
    button: {
      height: 16,
      width: 16,
      rx: 2,
      ry: 2,
      fill: 'transparent',
      stroke: 'transparent',
      cursor: 'pointer',
      event: 'node:collapse'
    },
    buttonSign: {
      refX: 3,
      refY: 3,
      stroke: '#808080'
    },
    label: {
      fontSize: 12,
      fill: 'black',
      refX: 30,
      refY: 13
    }
  }
})

Graph.registerNode('fn-group', FnGroup)
