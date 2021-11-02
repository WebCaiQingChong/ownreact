import {updateDom} from './commitRoot'
function createDom (fiber) {
    let dom

    if (fiber.type === 'TEXT_ELEMENT') {
        dom  = document.createTextNode('')
    } else {
        dom  = document.createElement(fiber.type)
    }

    updateDom(dom, {}, fiber.props)

    return dom
}

export default createDom