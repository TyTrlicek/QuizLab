import React from 'react'
import {Card, CardContent, CardHeader, CardTitle } from './ui/card'

const QuizCard = () => {
  return (
    <Card>
        <CardHeader className = "p-4">
            <CardTitle className="text-xl font-bold text-gray-800">
            title
            </CardTitle>
        </CardHeader>

        <CardContent>
        content
        </CardContent>
    </Card>
  )
}

export default QuizCard