import useTilt from '../hooks/useTilt'

/**
 * A card that rotates in 3D toward the cursor, with a specular glare that
 * tracks the pointer. Wrap content in `.layer-1/2/3` to make it float above
 * the card surface for real in-card parallax.
 */
export default function TiltCard({
  children,
  className = '',
  max = 9,
  scale = 1.02,
  glare = true,
  as: Tag = 'div',
  ...rest
}) {
  const ref = useTilt({ max, scale })

  return (
    <Tag
      ref={ref}
      className={`tilt-3d relative ${glare ? 'glare' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
