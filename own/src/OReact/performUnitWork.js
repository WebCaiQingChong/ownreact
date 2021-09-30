import createDom from './createDom'
import reconcileChildren from './reconcileChildren'
function performUnitWork (fiber) {

    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }

    if (fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom)
    }

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