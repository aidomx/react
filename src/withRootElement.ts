import type { Component, Rules } from 'aidomx'
import {
  getRootElement,
  createElementIfNotExist,
  applyStyles,
  applyEventListeners,
} from './helpers'

export const withRootElement = async (data: Rules) => {
  if (!data?.root) return

  await getRootElement(data.root, (el) => {
    if (!el) return
    mutationElement(el, data)
  })
}

export const mutationElement = (root: HTMLElement, data: Rules) => {
  data.components?.forEach((component: Component) => {
    if (!component.name) return
    const el = createElementIfNotExist(root, component.name)

    if (!root.contains(el)) {
      if (component?.posBefore) {
        root.insertBefore(el, root.firstChild)
      } else {
        root.appendChild(el)
      }
    }

    if (component?.style) applyStyles(el, component.style)
    if (component?.className)
      el.classList.add(...component.className.split(' '))
    if (component?.event) applyEventListeners(el, component.event)
  })

  if (data?.style) applyStyles(root, data.style)
  if (data?.className) root.classList.add(...data.className.split(' '))
  if (data?.event) applyEventListeners(root, data.event)
}
