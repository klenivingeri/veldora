import { Card } from "../../Card"

export const Cards = () => {
  return (
    <div className="flex gap-4 justify-between">
      <Card title="Total" value="100" />
      <Card title="Valor Pago" value="100" />
      <Card title="Difenrença" value="100" />
    </div>
  )
}