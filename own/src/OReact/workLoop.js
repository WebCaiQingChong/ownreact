import performUnitWork from './performUnitWork'
import { wipRoot } from './render'
import commitRoot from './commitRoot'
let nextUnitWork = null

function workLoop (deadline) {
    let shouldYield = false

    while(nextUnitWork && !shouldYield ) {
        nextUnitWork = performUnitWork(nextUnitWork)

        shouldYield = deadline.timeRemaining() < 1
    }

    if (!nextUnitWork && wipRoot) {
        commitRoot()
    }
    requestIdleCallback(workLoop)
}

function setNextUnitWork (work) {
    nextUnitWork = work
}

export {
    setNextUnitWork,
    workLoop
}