import createTextElement from './createTextElement'

function createElement (type, props, ...children) {

    return {
      type,
      props: {
        ...props,
        children: children.map(child => typeof child === 'string' ? createTextElement(child) : child)
      }
    }
  }


export default createElement