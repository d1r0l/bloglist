import Stack from '@mui/material/Stack'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'

/**
 * @param {import('@mui/material/Stack').StackProps} props
 */
const TwoChildrenRowStack = ({ children, ...props }) => {
  const [height, setHeight] = useState(0)
  const [childHeight, setChildHeight] = useState(0)
  const [singleChild, setSingleChild] = useState(false)
  const ref = useCallback((node) => {
    if (!node) return
    if (node.children.length === 1) {
      setSingleChild(true)
      return
    }
    const resizeObserver = new ResizeObserver(() => {
      setHeight(node.getBoundingClientRect().height)
      setChildHeight(node.children[0].getBoundingClientRect().height)
    })
    resizeObserver.observe(node)
  }, [])

  return (
    <Stack
      ref={ref}
      direction='row'
      flexWrap='wrap'
      alignItems='center'
      {...(!singleChild && height === childHeight
        ? { justifyContent: 'space-between' }
        : { justifyContent: 'center' })}
      {...props}
    >
      {children}
    </Stack>
  )
}

TwoChildrenRowStack.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired
}

export default TwoChildrenRowStack
