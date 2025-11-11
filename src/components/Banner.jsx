import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const media = [
  "https://kotaielectronics.com/wp-content/uploads/2024/01/on-device-generative-ai-with-sub-10-billion-parameter-models.jpg",
  "https://cdn.prod.website-files.com/629997f37bd997702e98c3b9/64eccaf508098191ef198d1d_8cUI7T8jYYcBmt8b-rUKqzTDgQCk8LfiiIvYndxtUZNUwSm3-6rRuLGg8CAzwcv-RL7rGAgsAL9fCsYI3Pvetn1ipa48BT-Frrn_QwwjE0-lDCK14j-R6VINJJCH8fF0Y-EgMtWj1aT-YV83X0DCEbo.jpeg",
  "https://plus.unsplash.com/premium_photo-1680608979589-e9349ed066d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % media.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((current - 1 + media.length) % media.length);
  const nextSlide = () => setCurrent((current + 1) % media.length);

  
  const isVideo = (src) => /\.(mp4|webm|mov|avi)$/i.test(src);

  return (
    <>
      <div className="absolute w-full flex top-0 left-0 justify-center">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full overflow-hidden bg-black rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {media.map((src, i) => (
                <div key={i} className="w-full shrink-0 relative">
                  {isVideo(src) ? (
                    <video
                      src={src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-[60vh] object-cover brightness-90"
                    />
                  ) : (
                    <img
                      src={src}
                      alt={`Banner ${i + 1}`}
                      className="w-full h-[60vh] object-cover brightness-90"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              ))}
            </div>

           
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

         
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {media.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    current === i ? "bg-white w-4" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[500px]"></div>
    </>
  );
};

export default Banner;