"use client"

import React, { useRef, useState, useEffect } from "react"

interface MobileCarouselProps {
  children: React.ReactNode
  /** Desktop container classes (must include md: prefix), e.g. "md:grid md:grid-cols-3 md:gap-4" */
  desktopClass: string
  /** Optional extra class applied to the mobile outer wrapper */
  mobileWrapClass?: string
}

export default function MobileCarousel({ children, desktopClass, mobileWrapClass }: MobileCarouselProps) {
  const items = React.Children.toArray(children)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const container = scrollRef.current
    if (!container || items.length <= 1) return

    const slides = Array.from(container.children) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.5) {
            const idx = slides.indexOf(entry.target as HTMLElement)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { root: container, threshold: 0.5 }
    )

    slides.forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [items.length]) // eslint-disable-line react-hooks/exhaustive-deps

  function scrollToSlide(index: number) {
    const container = scrollRef.current
    if (!container) return
    const slides = Array.from(container.children) as HTMLElement[]
    const slide = slides[index]
    if (!slide) return
    container.scrollTo({ left: slide.offsetLeft - 24, behavior: "smooth" })
  }

  return (
    <>
      {/* Mobile: horizontal scroll carousel */}
      <div className={`md:hidden${mobileWrapClass ? ` ${mobileWrapClass}` : ""}`}>
        <div ref={scrollRef} className="carousel-track">
          {items.map((item, i) => (
            <div key={i} className="carousel-slide">
              {item}
            </div>
          ))}
        </div>

        {items.length > 1 && (
          <div className="carousel-dots">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                aria-label={`Ir para item ${i + 1}`}
                className={`carousel-dot${active === i ? " carousel-dot-active" : ""}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: regular grid/flex (hidden on mobile) */}
      <div className={`hidden ${desktopClass}`}>
        {children}
      </div>
    </>
  )
}
