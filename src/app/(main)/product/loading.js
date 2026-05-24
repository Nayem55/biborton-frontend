export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Logo / Brand */}
      {/* <h1 className="text-2xl md:text-3xl font-semibold tracking-wide text-black mb-4">
        Biborton
      </h1> */}

      {/* Spinner */}
      <div className="w-10 h-10 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-4 text-gray-500 text-sm md:text-base">
        Loading premium experience...
      </p>
    </div>
  );
}
