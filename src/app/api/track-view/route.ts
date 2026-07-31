import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id, currentViews } = await request.json();

    const STRAPI_URL =
      process.env.NEXT_PUBLIC_STRAPI_URL ||
      "http://103.82.92.95:1337";

    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

    const cleanUrl = STRAPI_URL.replace(/\/$/, "");

    console.log("========== TRACK VIEW ==========");
    console.log("ID:", id);
    console.log("Current Views:", currentViews);


    // Cari berita berdasarkan id
    const findResponse = await fetch(
      `${cleanUrl}/api/data-berita?filters[id][$eq]=${id}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
      }
    );


    const findData = await findResponse.json();

    console.log(
      "DATA FIND:",
      JSON.stringify(findData, null, 2)
    );


    const berita = findData?.data?.[0];


    if (!berita) {
      return NextResponse.json(
        {
          success: false,
          message: "Berita tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }


    const documentId = berita.documentId;


    console.log(
      "DOCUMENT ID:",
      documentId
    );


    const newViews =
      (berita.view_count ?? 0) + 1;


    // Update view_count
    const updateResponse = await fetch(
      `${cleanUrl}/api/data-berita/${documentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            view_count: newViews,
          },
        }),
      }
    );


    console.log(
      "UPDATE STATUS:",
      updateResponse.status
    );


    const updateText =
      await updateResponse.text();


    console.log(
      "UPDATE RESPONSE:",
      updateText
    );


    return NextResponse.json({
      success: updateResponse.ok,
      views: newViews,
      response: updateText,
    });


  } catch (error: any) {

    console.error(
      "TRACK VIEW ERROR:",
      error
    );


    return NextResponse.json(
      {
        success:false,
        message:error.message,
      },
      {
        status:500,
      }
    );
  }
}