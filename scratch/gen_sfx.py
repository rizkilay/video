import asyncio
import edge_tts
import os

sfx = [
    ("alladji_soupir", "fr-FR-HenriNeural", "-15%", "-10Hz", "Pfff... mais quel casse-tête ce stock !"),
    ("alladji_ronfle", "fr-FR-HenriNeural", "-20%", "-20Hz", "Zzz... Ah... le stock est enfin carré..."),
    ("wives_murmur", "fr-FR-VivienneMultilingualNeural", "+0%", "+0Hz", "Cette fois-ci, personne ne vole Alladji !")
]

async def gen_sfx():
    os.makedirs("public/audio/takbir_sfx", exist_ok=True)
    for name, v, r, p, text in sfx:
        out = f"public/audio/takbir_sfx/{name}.mp3"
        comm = edge_tts.Communicate(text, v, rate=r, pitch=p)
        await comm.save(out)
        print(f"Generated {out}")

if __name__ == "__main__":
    asyncio.run(gen_sfx())
