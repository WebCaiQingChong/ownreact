function createDom (fiber) {
    let dom

    if (fiber.type === 'TEXT_ELEMENT') {
        dom  = document.createTextNode('')
    } else {
        dom  = document.createElement(fiber.type)
    }

    Object.keys(fiber.props).filter(e => e !== 'children').forEach(e => {
        dom[e] = fiber.props[e]
    })

    return dom
}

export default createDom