"use client";

import { BiMusic } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { useState,useEffect } from "react";
import { useMe } from "@/lib/hooks";
import { useDebounce } from "use-debounce";
const UserPlaylist = () => {
  const [image, setImage] = useState<string | null>(null);
  const {user} = useMe();
  const [query ,setQuery] = useState("")
  const [results,setResults] = useState([])
  const [added,setAdded]= useState([])
  const [debouncedQuery]= useDebounce(query,300)
  useEffect(()=>{
    if(!debouncedQuery){
      setResults([]);
      return;
    }
  
  const fetchResult= async()=>{
    const res = await fetch(
      `/api/search?query=${debouncedQuery}&filter=Songs`
    );
    
    const data = await res.json();
    console.log("Fetched song data:", data);
    setResults(data??[]);
    
  }
fetchResult();
  },[debouncedQuery]);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
const handleCreatePlaylist = async () => {
  if (!user?.id) return alert("User not logged in");

  const res = await fetch("/api/playlist/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "My Playlist #", // you can later allow editing this
      userId: user.id,
      songIds: added.map((song: any) => song.id),
    }),
  });

  if (res.ok) {
    alert("Playlist saved successfully!");
    // optionally clear added songs or redirect
    setAdded([]);
  } else {
    const data = await res.json();
    alert("Error saving playlist: " + data.error);
  }
};

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-row bg-gray-300/10">
        <div className="bg-gray-700/30 w-48 h-48 mx-4 mb-4 mt-12 group relative">
          {image ? (
            <img
              src={image}
              alt="uploaded"
              className="w-full h-full object-cover"
            />
          ) : (
            <BiMusic
              size={40}
              className="m-auto mt-20 group-hover:opacity-0 transition-opacity duration-200 opacity-100"
            />
          )}

          <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0 justify-center items-center bg-gray-300/10">
            <MdEdit size={40} className="text-white" />
            <span className="text-white">Choose Picture</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col my-auto gap-y-3">
          <small className="text-lg">Public Playlist</small>
          <h2 className="text-5xl font-bold">My Playlist #</h2>
          <small className="text-lg">{user?.firstName}</small>
        </div>
      </div>
      <div>
        {added.length > 0 && (
          <div className="mt-8 mx-6">
            <h3 className="text-xl font-semibold mb-2">Added to Playlist</h3>
            <ul className="space-y-2">
              {added.map((song: any, index: number) => (
                <li
                  key={index}
                  className="bg-gray-700 p-3 rounded-lg flex justify-between items-center"
                >
                  <p className="text-white">
                    {song.name} - {song.artist?.name}
                  </p>
                  <button
                    onClick={() =>
                      setAdded((prev) => prev.filter((s) => s.id !== song.id))
                    }
                    className="text-sm bg-red-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <hr className="mx-4 mt-3 text-gray-600" />
      <p className="mt-4 ml-4 font-bold">
        Let's find something for your playlist
      </p>

      <div>
        <div>
          <input
            type="text"
            placeholder="Search for songs"
            className="border mt-7 ml-6 p-3 w-94 rounded-lg border-gray-600"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div>
          {results.length > 0 && (
            <div className="mt-6 mx-6 mb-12">
              {/* <h3 className="text-xl font-semibold mb-2">Results</h3> */}
              <ul className="space-y-2">
                {results.map((song: any) => (
                  <li
                    key={song.id}
                    className="bg-gray-800 p-3 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="text-white font-medium">{song.name}</p>
                      <small className="text-gray-400">
                        {song.artist?.name}
                      </small>
                    </div>
                    <button
                      onClick={() => setAdded([...added, song])}
                      className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPlaylist;
