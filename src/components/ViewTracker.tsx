"use client";

import { useEffect } from "react";

export default function ViewTracker({
  id,
  currentViews,
}: {
  id: number;
  currentViews: number | null;
}) {
  useEffect(() => {

    console.log("VIEW TRACKER AKTIF:", id);


    const trackView = async () => {

      const isTracked = sessionStorage.getItem(`viewed_${id}`);

      if (isTracked) {
        console.log("Sudah dihitung sebelumnya:", id);
        return;
      }


      try {

        const response = await fetch(
          "/api/track-view",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              currentViews: currentViews ?? 0,
            }),
          }
        );


        const result = await response.json();


        console.log(
          "TRACK RESPONSE:",
          result
        );


        if (response.ok) {
          sessionStorage.setItem(
            `viewed_${id}`,
            "true"
          );
        }


      } catch(error){

        console.error(
          "TRACK ERROR:",
          error
        );

      }

    };


    trackView();


  }, [id, currentViews]);


  return null;
}