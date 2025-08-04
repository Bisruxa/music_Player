"use client";
import { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useDebounce } from "use-debounce";
import { formatTime } from "@/lib/formatters";

const filters = ["All", "Songs", "Playlists", "Artists"];


export default function SearchMusic() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [results, setResults] = useState<any[]>([]);
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery && activeFilter === "All") {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      const res = await fetch(
        `/api/search?query=${debouncedQuery}&filter=${activeFilter}`
      );
      const data = await res.json();
      setResults(data ?? []);
    };

    fetchResults();
  }, [debouncedQuery, activeFilter]);

  return (
    <div className="flex flex-col h-screen">
      {/* -- SEARCH BAR & FILTERS (fixed top) */}
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center mt-12">
          <MdSearch size={36} color="gray" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-gray-600/10 p-4 w-[640px] rounded-full ml-2"
            placeholder="What do you want to play?"
          />
        </div>

        <div className="mt-8 flex justify-left space-x-4 ml-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full cursor-pointer ${
                activeFilter === f
                  ? "bg-gray-200/5 text-white"
                  : "bg-gray-200/20"
              } hover:bg-gray-600`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* -- SCROLLABLE RESULTS AREA */}
      <div className="flex-1 overflow-y-auto p-6">
        {results.length > 0 ? (
          <>
            {activeFilter === "Songs" && (
              <div className="flex flex-col w-full max-h-[60vh] border-collapse">
                {/* Fixed header */}
                <table className="w-full table-fixed">
                  <thead className="sticky top-0  z-10">
                    <tr>
                      <th className="border-b p-2 text-left">Title</th>
                      <th className="border-b p-2 pl-96">
                        <AiOutlineClockCircle />
                      </th>
                    </tr>
                  </thead>
                </table>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto scrollbar-hide pb-32">
                  <table className="w-full table-fixed">
                    <tbody>
                      {results.map((song) => (
                        <tr key={song.id} className="hover:bg-gray-200/20">
                          <td className="p-2 flex flex-col">
                            {song.name}
                            <small>{song.artist?.name}</small>
                          </td>
                          <td className="p-2 pl-96">
                            {formatTime(song.duration)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeFilter === "Artists" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6  pb-24">
                {results.map((artist) => (
                  <div key={artist.id} className="text-center">
                    <img
                      src="/placeholder.jpg"
                      alt={artist.name}
                      className="w-24 h-24 rounded-full mx-auto"
                    />
                    <p className="mt-2 font-semibold">{artist.name}</p>
                  </div>
                ))}
              </div>
            )}

            {activeFilter === "Playlists" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6  pb-32">
                {results.map((pl) => (
                  <div key={pl.id} className="text-center">
                    <img
                      src={`https://picsum.photos/400?random ${pl.id}`}
                      alt={pl.name}
                      className="w-full h-32 object-cover rounded"
                    />
                    <p className="mt-2 font-semibold">{pl.name}</p>
                  </div>
                ))}
              </div>
            )}

            {activeFilter === "All" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border rounded-lg hover:shadow-md"
                  >
                    <h3 className="font-semibold">{item.name}</h3>
                    {item.artist && (
                      <p className="text-sm text-gray-600">
                        by {item.artist.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
}
