"use client";

interface GoogleMapProps {
  address: string;
  city: string;
  className?: string;
}

export function GoogleMap({ address, city, className = "" }: GoogleMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  const query = encodeURIComponent(address);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  if (!apiKey) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-gray-100 border border-gray-200 p-6 text-center ${className}`}
      >
        <div>
          <p className="text-sm text-gray-500 mb-3">
            {city ? `Find us in ${city}` : address}
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#1B5E8A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#154d73] transition-colors"
            aria-label={`Open ${city || address} in Google Maps`}
          >
            <svg
              className="h-4 w-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.145 16.085 16.085 0 0 0 3.049-2.567C15.193 14.48 17 11.89 17 9A7 7 0 1 0 3 9c0 2.89 1.807 5.48 3.336 7.21a16.087 16.087 0 0 0 3.049 2.567 5.743 5.743 0 0 0 .281.145l.018.008.006.003zM10 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                clipRule="evenodd"
              />
            </svg>
            View on Google Maps
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-xl ${className}`}>
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}`}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "280px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Google Map showing ${city || address}`}
        aria-label={`Map of ${city || address}`}
      />
    </div>
  );
}
