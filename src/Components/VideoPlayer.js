import React from "react";

const VideoPlayer = () => {
  return (
    <section className="w-full flex justify-center px-4 sm:px-8 py-8 sm:py-12">
      <div className="relative w-full container mx-auto px-6   aspect-video rounded-lg sm:rounded-none overflow-hidden shadow-lg sm:shadow-xl">
        <iframe
          className="absolute inset-0 w-full h-full"
          // src="https://www.youtube.com/embed/OD9p9IrVBXM?autoplay=1&mute=1&playsinline=1&loop=1&playlist=OD9p9IrVBXM"
          src="https://www.youtube.com/embed/NQysW2PVtlk?si=TX4i_Emqk4PkSEtN&autoplay=1&mute=1&playsinline=1&loop=1&playlist=NQysW2PVtlk"
          title="biborton collections Brand Film"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default VideoPlayer;
