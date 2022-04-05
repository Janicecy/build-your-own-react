import { createElement } from "./Didact"

let nextUnitOfWork = null
let wipRoot = null 

function workLoop(deadline) {
  let shouldYield = false

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining < 1
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function commitRoot() {
  commitWork(wipRoot.child)
  wipRoot = null 
}

function commitWork(fiber) {
  if (!fiber) return 

  fiber.parent.dom.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  let index = 0
  let prevSibling = null
  const { children } = fiber.props

  while (index < children.length) {
    const element = children[index]
    const { type, props } = element

    const newFiber = {
      type,
      props,
      parent: fiber,
      dom: null
    }

    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }

  if (fiber.child) {
    return fiber.child
  }

  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  const isProperty = key => key !== "children";
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name];
    });

  return dom
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    }
  }
  nextUnitOfWork = wipRoot
}

const Didact = {
  createElement,
  render
};

export default Didact