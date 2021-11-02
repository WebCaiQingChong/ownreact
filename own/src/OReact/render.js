import { setNextUnitWork, workLoop } from './workLoop'
let wipRoot
let currentRoot = null
let deletions = null
function render (element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: currentRoot
    }
    deletions = []
    setNextUnitWork(wipRoot)
    requestIdleCallback(workLoop)
}

function setWipRoot (root) {
    wipRoot = root
}

function setCurrentRoot (root) {
    currentRoot = root
}

function setDeletions (arr) {
    deletions = arr
}


export {
    render,
    setWipRoot,
    wipRoot,
    deletions,
    setCurrentRoot,
    currentRoot,
    setDeletions
}