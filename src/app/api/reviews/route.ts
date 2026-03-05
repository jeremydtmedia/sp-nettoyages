import { NextResponse } from "next/server"

export async function GET() {
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!placeId || !apiKey) {
    return NextResponse.json(
      { error: "Configuration manquante" },
      { status: 500 }
    )
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&language=fr&key=${apiKey}`

    const res = await fetch(url, { next: { revalidate: 86400 } })
    const data = await res.json()

    if (data.result) {
      return NextResponse.json(data.result)
    }

    return NextResponse.json(
      { error: "Aucun résultat" },
      { status: 404 }
    )
  } catch (error) {
    console.error("Erreur API Google Places:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
