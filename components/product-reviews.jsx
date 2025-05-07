"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "../hooks/use-auth"
import { Star } from "lucide-react"

export function ProductReviews({ productId }) {
  const { toast } = useToast()
  const { user } = useAuth()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // In a real app, this would fetch from an API
        // const response = await fetch(`/api/products/${productId}/reviews`)
        // const data = await response.json()
        // setReviews(data)

        // Fallback data
        setReviews(generateFallbackReviews(productId))
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [productId])

  const generateFallbackReviews = (productId) => {
    const reviews = []
    const names = ["Alex Johnson", "Sam Smith", "Jordan Lee", "Taylor Wong", "Casey Brown"]
    const comments = [
      "Great product, exactly as described!",
      "Shipping was fast and the item was in perfect condition.",
      "Good value for the price, would recommend.",
      "The quality is better than I expected.",
      "Seller was very responsive and helpful.",
    ]

    for (let i = 1; i <= 5; i++) {
      reviews.push({
        id: `review-${i}`,
        productId,
        userId: `user-${i}`,
        userName: names[i - 1],
        rating: Math.floor(Math.random() * 3) + 3, // 3-5 stars
        comment: comments[i - 1],
        createdAt: new Date(Date.now() - i * 86400000).toISOString(), // Past few days
      })
    }

    return reviews
  }

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to leave a review",
        variant: "destructive",
      })
      return
    }

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating",
        variant: "destructive",
      })
      return
    }

    if (!comment.trim()) {
      toast({
        title: "Comment required",
        description: "Please write a review comment",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, this would call an API endpoint
      // await fetch(`/api/products/${productId}/reviews`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ rating, comment }),
      // })

      const newReview = {
        id: `review-${Date.now()}`,
        productId,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      }

      setReviews([newReview, ...reviews])
      setComment("")
      setRating(0)

      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="animate-pulse h-40 bg-gray-200 rounded"></div>
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Reviews:</h3>

      {user && (
        <div className="mb-8 p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Write a Review</h4>

          <div className="flex mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer w-6 h-6 ${
                  star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              />
            ))}
          </div>

          <Textarea
            placeholder="Share your experience with this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-4"
          />

          <Button onClick={handleSubmitReview}>Submit Review</Button>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{review.userName}</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
