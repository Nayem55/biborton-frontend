import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";

const ReelsSection = () => {
  const reels = [
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/02/reels_video-1.mp4",
      title: "Deep Blue",
      subtitle: "J. Fragrances",
    },
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/01/@JJunaidJamshedPK-Janan-Gold-Edition-junaidjamshed-jdotfragrances.mp4",
      title: "Janan Gold Edition ",
      subtitle: "J. Fragrances",
    },
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/01/reels.mp4",
      title: "Own Your Game",
      subtitle: "J. Fragrances",
    },
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/02/reels_video-5.mp4",
      title: "Deep Blue",
      subtitle: "J. Fragrances",
    },

    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/02/reels_video-4.mp4",
      title: "Deep Blue",
      subtitle: "J. Fragrances",
    },
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/02/reels_video-2.mp4",
      title: "Deep Blue",
      subtitle: "J. Fragrances",
    },
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/02/reels_video-3.mp4",
      title: "Deep Blue",
      subtitle: "J. Fragrances",
    },
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/01/Deep-Black-_-J.-Fragrances.mp4",
      title: "Deep Black",
      subtitle: "J. Fragrances",
    },
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/01/Deep-Blue-_-J.-Fragrances-2.mp4?_=0",
      title: "Deep Blue",
      subtitle: "J. Fragrances",
    },
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/01/Deep-Black-_-J.-Fragrances.mp4",
      title: "Deep Black",
      subtitle: "J. Fragrances",
    },
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/01/Deep-Black-_-J.-Fragrances.mp4",
      title: "Deep Black",
      subtitle: "J. Fragrances",
    },
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/01/@JJunaidJamshedPK-Janan-Gold-Edition-junaidjamshed-jdotfragrances.mp4",
      title: "Janan Gold Edition ",
      subtitle: "J. Fragrances",
    },
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/01/Deep-Blue-_-J.-Fragrances-2.mp4?_=0",
      title: "Deep Blue",
      subtitle: "J. Fragrances",
    },
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/01/Deep-Black-_-J.-Fragrances.mp4",
      title: "Deep Black",
      subtitle: "J. Fragrances",
    },
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/01/@JJunaidJamshedPK-Janan-Gold-Edition-junaidjamshed-jdotfragrances.mp4",
      title: "Janan Gold Edition ",
      subtitle: "J. Fragrances",
    },
    {
      video:
        "https://luvit.com.bd/wp-content/uploads/2026/01/J.-Fragrances-x-BD-l-Coming-Soon.mp4",
      title: "Own Your Game",
      subtitle: "J. Fragrances",
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-background-dark border-y border-black/5 overflow-hidden">
      <Swiper
        modules={[FreeMode]}
        spaceBetween={16}
        slidesPerView="auto"
        freeMode
        className="mx-auto px-6 items-center"
      >
        {reels.map((reel, index) => (
          <SwiperSlide
            key={index}
            className="!w-[200px] sm:!w-[220px] md:!w-[230px]"
          >
            <ReelCard reel={reel} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

const ReelCard = ({ reel }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="flex-none w-full aspect-[9/16] rounded-2xl overflow-hidden relative cursor-pointer"
      onClick={handleTogglePlay}
    >
      <video
        ref={videoRef}
        src={reel.video}
        className="w-full h-full object-cover"
        muted={isMuted}
        autoPlay
        loop
        playsInline
        preload="metadata"
        loading="lazy"
      />

      {/* Gradient + Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 pointer-events-none">
        <span className="text-white text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
          {reel.title}
        </span>
        <p className="text-white/70 text-xs">{reel.subtitle}</p>
      </div>

      {/* Play icon (only when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Play className="text-white" size={40} fill="white" />
        </div>
      )}

      {/* Sound toggle */}
      <button
        onClick={toggleSound}
        className="absolute top-3 right-3 bg-black/60 p-2 rounded-full backdrop-blur"
      >
        {isMuted ? (
          <VolumeX size={16} className="text-white" />
        ) : (
          <Volume2 size={16} className="text-white" />
        )}
      </button>
    </div>
  );
};

export default ReelsSection;
