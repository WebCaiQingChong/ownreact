function render (element, container) {
    let dom

    if (element.type === 'TEXT_ELEMENT') {
        dom  = document.createTextNode('')
    } else {
        dom  = document.createElement(element.type)
    }

    element.props.children.forEach(child => {
        render(child, dom)
    })

    Object.keys(element.props).filter(e => e !== 'children').forEach(e => {
        dom[e] = element.props[e]
    })
    container.appendChild(dom)
}

export default render