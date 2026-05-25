export default function MediaCoverageSectionEBY() {
  const img =
    "https://luvit.com.bd/wp-content/uploads/2025/09/56f002ed-e0db-4d2c-9d4d-954253a36f5e-1300x736.jpg";

  return (
    <section id="media-coverage-eby" className="relative w-full">
      {/* Section container */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-20">
        {/* Heading */}
        <div className="mb-6 md:mb-12">
          {/* Mobile badge row */}
          <div className="flex items-center gap-2 sm:hidden mb-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> Media
              Coverage
            </span>
            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-medium text-neutral-700 ring-1 ring-neutral-200">
              Sept 2025
            </span>
          </div>

          {/* Desktop/Tablet badge */}
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-600" /> Media
            Coverage
          </span>

          <h2 className="mt-2 sm:mt-4 text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-lime-600 bg-clip-text text-transparent">
              Junaid Jamshed collections
            </span>{" "}
            <span className="sm:inline hidden">in the Spotlight</span>
            <span className="sm:hidden block">— in the Spotlight</span>
          </h2>
        </div>

        {/* Media card */}
        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl ring-1 ring-black/5">
          {/* Image */}
          <div className="relative w-full">
            <img
              src={img}
              alt="Junaid Jamshed collections — Media feature visual"
              className="w-full h-auto sm:inset-0 sm:h-full sm:w-full object-contain sm:object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />

            {/* Desktop/Tablet overlays */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent hidden sm:block" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent hidden sm:block" />

            {/* Floating corner badges (desktop) */}
            <div className="absolute left-4 top-4 hidden sm:flex items-center gap-2">
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur-md shadow">
                Nature-First
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-900 backdrop-blur-md shadow">
                September 2025
              </span>
            </div>

            {/* Caption panel (desktop overlay) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 hidden sm:block">
              <div className="max-w-xl rounded-2xl bg-white/80 p-4 sm:p-6 backdrop-blur-md shadow-lg ring-1 ring-white/60">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Featured Story
                </p>
                <h3 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900">
                  Clean Beauty, Real Results — Junaid Jamshed collections in the
                  Media
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  Junaid Jamshed collections is redefining skincare with a
                  commitment to nature-inspired, safe, and effective
                  formulations. Our recent media features highlight how we bring
                  together clean beauty, sustainable practices, and real results
                  — helping individuals embrace wellness and confidence with
                  products rooted in purity and care.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.canvasmagazine.com.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    See Magazine
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile caption (separate card, not overlaid) */}
          <div className="sm:hidden p-4">
            <div className="rounded-2xl border border-white/60 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 p-4 shadow ring-1 ring-neutral-100">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                Featured Story
              </p>
              <h3 className="mt-1 text-lg font-bold text-gray-900">
                Clean Beauty, Real Results — Junaid Jamshed collections in the
                Media
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Junaid Jamshed collections is redefining skincare with a
                commitment to nature-inspired, safe, and effective formulations.
                Our recent media features highlight how we bring together clean
                beauty, sustainable practices, and real results — helping
                individuals embrace wellness and confidence with products rooted
                in purity and care.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href="https://www.canvasmagazine.com.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow hover:shadow-md transition-all"
                >
                  See Magazine
                </a>
                <div className="flex items-center justify-between text-[12px] text-neutral-600">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />{" "}
                    Nature-First
                  </span>
                  <span>September 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative glows */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-emerald-400/30 blur-3xl hidden sm:block" />
          <div className="pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-teal-400/30 blur-3xl hidden sm:block" />
        </div>
      </div>
    </section>
  );
}
