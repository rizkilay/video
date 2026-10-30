import edge_tts
import asyncio
import os

# Voiceover segments:
# We want a calm, mature, storytelling voice.
# French voice with natural cadence, warm and deep.
# Let's test Henri (-5% rate, -6Hz pitch) and Remy (-5% rate, -4Hz pitch).

text_segments = {
    "scene1": "Alladji Tacbir souffre d'un seul problème : le nombre de ses produits.",
    "scene2": "Et quand on le voit discuter de cette manière avec ses employés, c'est que soit c'est lui qui a raison, soit ce sont eux, et cela tourne autour du nombre réel de produits.",
    "scene3": "Résultat, on voit de nouveaux employés dans la boutique.",
    "scene4_solution": "Pourtant, tout cela pourrait être évité juste s’il permettait à ses employés d’enregistrer systématiquement les sorties de produits à l’aide du logiciel Adék Solution.",
    "scene4_details": "Il pourrait mieux contrôler les mouvements de stock, enregistrer les pertes de produits, suivre les ventes à crédit et connaître précisément les clients qui lui doivent de l’argent.",
    "scene5_serenite": "Avec Adék Solution, il pourrait enfin avoir une vision claire de son stock, limiter les désaccords avec ses employés et gérer sa boutique en toute sérénité."
}

async def generate_voiceovers():
    os.makedirs("public/audio/takbir", exist_ok=True)
    # fr-FR-HenriNeural is mature, authoritative, warm male voice
    voice = "fr-FR-HenriNeural"
    rate = "-6%"
    pitch = "-6Hz"
    
    for key, text in text_segments.items():
        out_file = f"public/audio/takbir/{key}.mp3"
        comm = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
        await comm.save(out_file)
        print(f"Generated {out_file}")

if __name__ == "__main__":
    asyncio.run(generate_voiceovers())
