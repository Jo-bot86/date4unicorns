import React from 'react'
import { useParams } from 'react-router-dom'

export default function Home() {
  const { path } = useParams()
  return (
    <div>Home</div>
  )
}
