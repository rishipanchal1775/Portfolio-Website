// Evaluate basic arithmetic without executing arbitrary JavaScript.
export function calculate(expression) {
  const tokens = expression.match(/\d*\.?\d+|[()+\-*/%]/g) ?? []
  if (tokens.join("") !== expression.replace(/\s+/g, "")) throw new Error("Invalid expression")

  let index = 0
  const peek = () => tokens[index]
  const take = () => tokens[index++]

  function primary() {
    if (peek() === "+" || peek() === "-") {
      const sign = take() === "-" ? -1 : 1
      return sign * primary()
    }
    if (take() === "(") {
      const value = sum()
      if (take() !== ")") throw new Error("Missing closing parenthesis")
      return value
    }
    index -= 1
    const value = Number(take())
    if (!Number.isFinite(value)) throw new Error("Invalid number")
    return value
  }

  function product() {
    let value = primary()
    while (["*", "/", "%"].includes(peek())) {
      const operator = take()
      const next = primary()
      if ((operator === "/" || operator === "%") && next === 0) throw new Error("Cannot divide by zero")
      value = operator === "*" ? value * next : operator === "/" ? value / next : value % next
    }
    return value
  }

  function sum() {
    let value = product()
    while (peek() === "+" || peek() === "-") {
      const operator = take()
      const next = product()
      value = operator === "+" ? value + next : value - next
    }
    return value
  }

  if (!tokens.length) throw new Error("Empty expression")
  const result = sum()
  if (index !== tokens.length || !Number.isFinite(result)) throw new Error("Invalid expression")
  return result
}
