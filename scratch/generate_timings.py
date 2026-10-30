import asyncio
import edge_tts
import json
import os

text_segments = {
    "scene1": "Alladji Tacbir souffre d'un seul problème : le nombre de ses produits.",
    "scene2": "Et quand on le voit discuter de cette manière avec ses employés, c'est que soit c'est lui qui a raison, soit ce sont eux, et cela tourne autour du nombre réel de produits.",
    "scene3": "Résultat, on voit de nouveaux employés dans la boutique.",
    "scene4_solution": "Pourtant, tout cela pourrait être évité juste s’il permettait à ses employés d’enregistrer systématiquement les sorties de produits à l’aide du logiciel Adék Solution.",
    "scene4_details": "Il pourrait mieux contrôler les mouvements de stock, enregistrer les pertes de produits, suivre les ventes à crédit et connaître précisément les clients qui lui doivent de l’argent.",
    "scene5_serenite": "Avec Adék Solution, il pourrait enfin avoir une vision claire de son stock, limiter les désaccords avec ses employés et gérer sa boutique en toute sérénité."
}

async def get_timings():
    voice = "fr-FR-HenriNeural"
    rate = "-6%"
    pitch = "-6Hz"
    results = {}
    
    for key, text in text_segments.items():
        comm = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
        sub_maker = edge_tts.SubMaker()
        audio_data = bytearray()
        async for chunk in comm.stream():
            if chunk["type"] == "audio":
                audio_data.extend(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                sub_maker.create_sub((chunk["offset"], chunk["duration"]), chunk["text"])
        
        # Save audio file
        audio_path = f"public/audio/takbir/{key}.mp3"
        with open(audio_path, "wb") as f:
            f.write(audio_data)
        
        # Calculate duration from sub_maker cues
        if sub_maker.cues:
            last_cue = sub_maker.cues[-1]
            dur_seconds = (last_cue.end.total_seconds()) + 0.3 # add brief padding
        else:
            dur_seconds = 4.0
            
        results[key] = {
            "durationSeconds": round(dur_seconds, 2),
            "framesAt30Fps": int(round(dur_seconds * 30)),
            "text": text
        }
        
    with open("src/AdekTakbir/audioTimings.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print("Timings generated:")
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    os.makedirs("src/AdekTakbir", exist_ok=True)
    asyncio.run(get_timings())
