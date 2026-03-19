import React, { useState } from 'react'
import { ReviewHeader, ReviewList } from "../../features/admin/reviews"

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="max-w-full min-h-screen bg-white rounded-t-[2rem] pb-20 px-2">
      <div className="pt-8 flex flex-col gap-10">
        {/* Header with Search Bar */}
        <ReviewHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* List that reacts to search */}
        <ReviewList searchTerm={searchTerm} />
      </div>
    </div>
  )
}

export default Reviews