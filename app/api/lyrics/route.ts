import { NextResponse } from 'next/server';

const GENIUS_ACCESS_TOKEN = process.env.GENIUS_ACCESS_TOKEN;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const songTitle = searchParams.get('title');
  const artist = searchParams.get('artist');

  if (!songTitle) {
    return NextResponse.json({ error: 'Song title is required' }, { status: 400 });
  }

  try {
    // Search for the song on Genius
    const searchQuery = artist ? `${artist} ${songTitle}` : songTitle;
    const searchResponse = await fetch(
      `https://api.genius.com/search?q=${encodeURIComponent(searchQuery)}`,
      {
        headers: {
          Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}`,
        },
      }
    );

    const searchData = await searchResponse.json();

    if (!searchData.response.hits || searchData.response.hits.length === 0) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 });
    }

    // Get the first result
    const song = searchData.response.hits[0].result;

    return NextResponse.json({
      title: song.title,
      artist: song.primary_artist.name,
      url: song.url,
      thumbnail: song.song_art_image_thumbnail_url,
      header_image: song.header_image_url,
      // Note: Genius API doesn't directly provide lyrics text
      // You would need to scrape the lyrics from the song.url
      // For now, we'll return the song info
    });
  } catch (error) {
    console.error('Error fetching from Genius:', error);
    return NextResponse.json({ error: 'Failed to fetch song data' }, { status: 500 });
  }
}
