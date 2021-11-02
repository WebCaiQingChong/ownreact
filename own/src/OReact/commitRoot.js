import {wipRoot, setWipRoot, deletions} from './render'
function commitWork (fiber) {
    if (!fiber) {
        return
    }
    let domParentFiber = fiber.parent
    while(!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent
    }
    const domParent = domParentFiber.dom

    if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
        domParent.appendChild(fiber.dom)
    } else if (fiber.effectTag === 'DETETION'){
        commitDeletion(fiber, domParent)
    } else if (fiber.effectTag === 'UPDATE'){
        // update Dom
        updateDom(fiber.dom, fiber.alternate.props, fiber.props)
    }


    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

function commitDeletion (fiber, domParent) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom)
    } else {
        commitDeletion(fiber.child, domParent)
    }
}
function commitRoot () {
    deletions.forEach(commitWork)
    commitWork(wipRoot.child)
    setWipRoot(null)
}

const isProperty = (key) => key !== 'children'

const isNew = (prev, next) => key => prev[key] !== next[key]

const isGone = (_prev, next) => key => !(key in next)

const isEvent = key => key.startWith('on')

const getEventType = name => name.substring(2).toLowerCase()

function updateDom (dom, prevProps, nextProps) {
    // remove old properties
    Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
        dom[name] = ''
    })


    // set new properties or change old pproperties

    Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
        dom[name] = nextProps[name]
    })


    // remove old event handle

    Object.keys(prevProps)
    .filter(isEvent)
    .filter( key => !(key in prevProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
        const eventType = getEventType(name)

        dom.removeEventListener(eventType, prevProps[name])
    })

    // add new event handle
    Object.keys(nextProps)
    .filter(isNew)
    .filter(isEvent)
    .forEach(name => {
        const eventType = getEventType(name)
        dom.addEventListener(eventType, nextProps[name])
    })

}

export {updateDom}
export default commitRoot