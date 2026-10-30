import asyncio
import edge_tts
import os

paragraphs = {
    "narration_scene1": "Alladji Tacbir souffre d'un seul problème : le nombre de ses produits.",
    "narration_scene2": "Et quand on le voit discuter de cette manière avec ses employés, c'est que soit c'est lui qui a raison, soit ce sont eux, et cela tourne autour du nombre réel de produits.",
    "narration_scene3": "Résultat, on voit de nouveaux employés dans la boutique.",
    "narration_scene4": "Pourtant, tout cela pourrait être évité juste s’il permettait à ses employés d’enregistrer systématiquement les sorties de produits à l’aide du logiciel Adék Solution. Il pourrait mieux contrôler les mouvements de stock, enregistrer les pertes de produits, suivre les ventes à crédit et connaître précisément les clients qui lui doivent de l’argent.",
    "narration_scene5": "Avec Adék Solution, il pourrait enfin avoir une vision claire de son stock, limiter les désaccords avec ses employés et gérer sa boutique en toute sérénité."
}

async def generate():
    os.makedirs("public/audio/takbir_narration", exist_ok=True)
    voice = "fr-FR-HenriNeural"
    rate = "-5%"
    pitch = "-5Hz"
    
    for key, text in paragraphs.items():
        out_f = f"public/audio/takbir_narration/{key}.mp3"
        comm = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
        await comm.save(out_f)
        size = os.path.getsize(out_f)
        dur = size / 6000.0
        print(f"{key}: {dur:.2f}s ({int(dur*30)} frames)")

if __name__ == "__main__":
    asyncio.run(generate())
