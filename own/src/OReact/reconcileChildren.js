import {deletions} from './render'
function reconcileChildren (wipFiber, elements) {
    let index = 0
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child

    let prevSibling = null


    // 此处判断有坑
    while (index < elements.length || oldFiber != null) {
        const element = elements[index]
        let newFiber = null

        const sameType = element && oldFiber && element.type === oldFiber.type
        

        // 类型相同，即tag不需要进行修改，只进行props的修改
        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: 'UPDATE'
            }
        }

        // 没有oldFiber，即新插入了元素
        if (element && !sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: wipFiber,
                alternate: null,
                effectTag: 'PLACEMENT'
            }
        }

        // 没有新的元素，只有oldFiber ,删除操作
        if (oldFiber && !sameType) {
            oldFiber.effectTag = 'DELETION'
            deletions.push(oldFiber)
        }
        // const newFiber = {
        //     type: element.type,
        //     props: element.props,
        //     dom: null,
        //     parent: wipFiber
        // }

        // if(oldFiber) {
        //     oldFiber = oldFiber.sibling
        // }

        if (index === 0) {
            // 默认选定第一个元素当做child，其他的都是child的siblings
            wipFiber.child = newFiber
        } else {
            // 单向链表标识siblings
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber
        index ++

    }
}

export default reconcileChildren