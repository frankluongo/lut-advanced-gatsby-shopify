import React, { useContext } from 'react'
import { StoreContext } from "../context/StoreContext";
import { useTransition, animated } from 'react-spring'

const Loader = ({ styles }) => {
  const { isLoading } = useContext(StoreContext);

  const transitions = useTransition(isLoading, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return transitions.map(({ item, key, props}) =>
    item && (
      <animated.div
        key={key}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...props
        }}>
          Loading
      </animated.div>
    )
  )
}

export default Loader
