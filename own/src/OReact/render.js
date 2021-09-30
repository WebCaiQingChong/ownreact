import { setNextUnitWork, workLoop } from './workLoop'
let wipRoot
let deletions = null
function render (element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        }
    }
    deletions = []
    setNextUnitWork(wipRoot)
    requestIdleCallback(workLoop)
}

function setWipRoot (root) {
    wipRoot = root
}


export {
    render,
    setWipRoot,
    wipRoot,
    deletions
}