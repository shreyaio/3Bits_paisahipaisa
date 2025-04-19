"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

interface FeedbackFormProps {
  itemName: string
  userName: string
  onSubmit?: (data: { rating: number; comment: string }) => void
  onCancel?: () => void
  isOwnerFeedback?: boolean
}

export default function FeedbackForm({
  itemName,
  userName,
  onSubmit,
  onCancel,
  isOwnerFeedback = false,
}: FeedbackFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = () => {
    if (rating === 0) return

    if (onSubmit) {
      onSubmit({ rating, comment })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Feedback</CardTitle>
        <CardDescription>
          {isOwnerFeedback
            ? `Rate your experience with ${userName} borrowing your ${itemName}`
            : `Rate your experience with ${itemName}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  className={`h-8 w-8 ${
                    (hoverRating || rating) >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent"}
          </p>
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder={
              isOwnerFeedback
                ? `Share your experience with ${userName} as a borrower...`
                : "Share your experience with this item..."
            }
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <p className="text-xs text-gray-500">Your feedback helps the community make better rental decisions.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={rating === 0}>
          Submit Feedback
        </Button>
      </CardFooter>
    </Card>
  )
}
