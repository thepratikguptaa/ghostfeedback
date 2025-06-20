'use client'
import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import messages from "@/messages.json";

const Home = () => {
  return (
    <>
    <main className='flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12'>
      <section className='flex flex-col items-center justify-center text-center mb-8 md:mb-12'>
        <h1 className='text-4xl text-center font-bold mb-4 md:mb-12'>Dive into the world of Ghost Feedback</h1>
        <p className='text-lg text-center'>Explore Ghost Feedback - Where your identity remains a secret</p>
      </section>
      <Carousel
      plugins={[Autoplay({ delay: 3000 })]}
      className="w-full max-w-xs">
      <CarouselContent>
        {
        messages.map((message, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">{message.title}</h2>
                </CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold mr-4">{message.content}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </main>
    <footer className='bg-gray-800 text-white py-4 mt-8 w-full'>
      <div className='container mx-auto text-center'>
        <p>&copy; {new Date().getFullYear()} Ghost Feedback. All rights reserved.</p>
      </div>
    </footer>
    </>
  )
}

export default Home