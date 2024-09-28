import Stack from '@mui/material/Stack'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'

/**
 * @param {import('@mui/material/Stack').StackProps & { inner?: boolean }} props
 */
const FormLinkStack = ({ inner = false, children, ...props }) => {
  const commonProps = {
    direction: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  }

  if (inner) {
    return (
      <Stack {...commonProps} justifyContent='center' gap={0.5} {...props}>
        {children}
      </Stack>
    )
  } else {
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
        {...commonProps}
        rowGap={1}
        columnGap={3}
        {...(!singleChild && height === childHeight
          ? { justifyContent: 'space-between' }
          : { justifyContent: 'center' })}
        {...props}
      >
        {children}
      </Stack>
    )
  }
}

FormLinkStack.propTypes = {
  inner: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default FormLinkStack
