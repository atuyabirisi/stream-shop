import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
        alt="Luxury Airbnb"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="max-w-3xl text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl leading-tight font-[Playfair_Display]"
          >
            Bethany Cushy Homes
          </motion.h1>

          {/* <p className="mt-4 text-sm tracking-[0.3em] uppercase text-gray-300">
            Airbnb • Cleaning Services • Fast Food
          </p> */}

          <p className="mt-6 text-lg text-gray-200">
            Premium Airbnb stays crafted for comfort, elegance and memorable
            experiences.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="rounded-full bg-white px-6 py-3 text-black">
              Explore Stays
            </button>

            <button className="rounded-full border border-white px-6 py-3">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
