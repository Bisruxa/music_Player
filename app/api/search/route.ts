import {NextResponse} from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req:Request){
  const {searchParams} = new URL(req.url)
  const query = searchParams.get("query") || "";
  const filter = searchParams.get("filter") || "All";

  try {
if(filter === "Artists"){
  const artists = await prisma.artist.findMany({
    where:{
      name:{
        contains:query,
        mode:'insensitive',
      },
    },
  });
  return NextResponse.json(artists);
}
if(filter === "Playlists"){
  const playlists = await prisma.playlist.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
return NextResponse.json(playlists);
}
if (filter === "Songs"){
  const songs = await prisma.song.findMany({
    where:{
      name:{
        contains:query,
        mode:'insensitive',
      },
    },
    include:{
    artist:true,
  },
  })
  return NextResponse.json(songs);
}
const all = await prisma.song.findMany({
  where:{
    OR:[
      {name:{contains:query,mode:'insensitive'}},
      {artist:{name:{contains:query,mode:'insensitive'}}},
    ],
  },
  include:{
    artist:true,
  },
}); 
return NextResponse.json(all);
  }
  catch(e){
return NextResponse.json({error:"failed to search"},{status:500})
  }
}