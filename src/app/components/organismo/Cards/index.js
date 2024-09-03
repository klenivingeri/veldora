import { currency } from "../../../utils/currency";
import { Card } from "../../Card"

export const Cards = ({value}) => {
  return (
    <div className="flex gap-4 justify-between">
      <Card title="Total" value={currency(value)} />
      <Card title="Valor Pago" value="100" />
      <Card title="Difenrença" value="100" />
    </div>
  )
}