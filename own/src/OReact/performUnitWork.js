import createDom from './createDom'
import reconcileChildren from './reconcileChildren'
import {setWipRoot, currentRoot, wipRoot, setDeletions} from './render'
import {setNextUnitWork} from './workLoop'
function performUnitWork (fiber) {
    const isFunctionComponent = fiber.type instanceof Function

    if (isFunctionComponent) {
        updateFunctionComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }
    

    // if (fiber.parent) {
    //     fiber.parent.dom.appendChild(fiber.dom)
    // }

    const elements = fiber.props.children
    reconcileChildren(fiber, elements)
    

    if (fiber.child) {
        return fiber.child
    }

    let nextFiber = fiber
    while(nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }

        nextFiber = nextFiber.parent
    }
}
let hookIndex = 0
let wipFiber = null
function updateFunctionComponent (fiber) {
    wipFiber = fiber
    hookIndex = 0
    wipFiber.hooks = []
    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber, children)
}

function useState (initial) {
    const oldHook = 
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex]

    const hook = {
        state: oldHook ? oldHook.state : initial,
        queue: []
    }

    const actions = oldHook ? oldHook.queue: []

    actions.forEach(action => {
        hook.state = action(hook.state)
    })
    const setState = action => {
        hook.queue.push(action)

        setWipRoot({
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot
        })

        setNextUnitWork(wipRoot)
        setDeletions([])
    }
    wipFiber.hooks.push(hook)

    hookIndex++
    return [hook.state, setState]
}
function updateHostComponent (fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }

    reconcileChildren(fiber, fiber.props.children)
}
export {
    useState
}
export default performUnitWork



// const fiber = {
//     tppe: '',  // element type exam: div | h1 | p
//     dom: '', // real dom
//     parent: 'dom', // real dom
//     sibling: '', // real dom
//     props: {
//         children: [],
//     }
// }