export function clampWindow(position, size, viewport) {
  const width = Math.min(size.width, Math.max(1, viewport.width - 16))
  const height = Math.min(size.height, Math.max(1, viewport.height - 56))
  return {
    x: Math.min(Math.max(position.x, 8), Math.max(8, viewport.width - width - 8)),
    y: Math.min(Math.max(position.y, 8), Math.max(8, viewport.height - height - 48)),
    width,
    height,
  }
}

export function resizeWindow(start, direction, delta, viewport) {
  const maxWidth = Math.max(1, viewport.width - 16)
  const maxHeight = Math.max(1, viewport.height - 56)
  const minWidth = Math.min(300, maxWidth)
  const minHeight = Math.min(200, maxHeight)
  let { x, y, width, height } = start

  if (direction.includes("right")) width = Math.min(maxWidth, start.width + delta.x)
  if (direction.includes("bottom")) height = Math.min(maxHeight, start.height + delta.y)
  if (direction.includes("left")) {
    width = Math.min(maxWidth, start.width - delta.x)
    x = start.x + start.width - width
  }
  if (direction.includes("top")) {
    height = Math.min(maxHeight, start.height - delta.y)
    y = start.y + start.height - height
  }

  return width >= minWidth && height >= minHeight ? { position: { x, y }, size: { width, height } } : null
}
