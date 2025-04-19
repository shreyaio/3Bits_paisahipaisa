import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Info } from "lucide-react"

interface FeeBreakdownProps {
  rentalPrice: number
  days: number
  deposit?: number
  showDeposit?: boolean
}

export default function FeeBreakdown({ rentalPrice, days, deposit = 0, showDeposit = true }: FeeBreakdownProps) {
  // Calculate fees
  const subtotal = rentalPrice * days
  const serviceFee = subtotal * 0.1 // 10% service fee
  const processingFee = (subtotal + serviceFee) * 0.029 + 0.3 // 2.9% + $0.30 processing fee
  const total = subtotal + serviceFee + processingFee

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fee Breakdown</CardTitle>
        <CardDescription>Transparent pricing with no hidden fees</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>
              ${rentalPrice.toFixed(2)} × {days} day{days !== 1 ? "s" : ""}
            </span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Service fee (10%)</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment processing</span>
            <span>${processingFee.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {showDeposit && deposit > 0 && (
            <>
              <Separator className="my-2" />
              <div className="flex justify-between text-gray-500">
                <span>Security deposit (refundable)</span>
                <span>${deposit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total charge</span>
                <span>${(total + deposit).toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        <div className="bg-gray-50 border rounded-lg p-3 text-sm">
          <div className="flex items-start">
            <Info className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-gray-600">
                The security deposit will be held until the item is returned in its original condition. It will be
                refunded within 24-48 hours after return.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
