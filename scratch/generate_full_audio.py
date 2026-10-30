import asyncio
import edge_tts
import os

# Complete script narration according to user:
# "Alladji Tacbir souffre d'un seul problème : le nombre de ses produits.
# Et quand on le voit discuter de cette manière avec ses employés, c'est que soit c'est lui qui a raison, soit ce sont eux, et cela tourne autour du nombre réel de produits.
# Résultat, on voit de nouveaux employés dans la boutique.
# Pourtant, tout cela pourrait être évité juste s’il permettait à ses employés d’enregistrer systématiquement les sorties de produits à l’aide du logiciel Adék Solution.
# Il pourrait mieux contrôler les mouvements de stock, enregistrer les pertes de produits, suivre les ventes à crédit et connaître précisément les clients qui lui doivent de l’argent.
# Avec Adék Solution, il pourrait enfin avoir une vision claire de son stock, limiter les désaccords avec ses employés et gérer sa boutique en toute sérénité."

narration_parts = [
    {
        "id": "part1_curedent",
        "text": "Alladji Tacbir souffre...",
        "pause_after": 0.5
    },
    {
        "id": "alladji_groan",
        "voice": "fr-FR-HenriNeural",
        "rate": "-10%",
        "pitch": "-15Hz",
        "text": "Ayiie... mais où sont passés mes téléphones ?!"
    },
    {
        "id": "part1_probleme",
        "text": "...d'un seul problème : le nombre de ses produits.",
        "pause_after": 0.8
    },
    {
        "id": "part2_dispute_lead",
        "text": "Et quand on le voit discuter de cette manière avec ses employés...",
        "pause_after": 0.3
    },
    {
        "id": "alladji_shout",
        "voice": "fr-FR-HenriNeural",
        "rate": "+5%",
        "pitch": "+2Hz",
        "text": "Le compte n'est pas bon du tout ! Qui a touché au stock ?!"
    },
    {
        "id": "employes_repondent",
        "voice": "fr-FR-RemyMultilingualNeural",
        "rate": "+2%",
        "pitch": "+5Hz",
        "text": "Mais patron ! On a tout bien noté !"
    },
    {
        "id": "part2_dispute_end",
        "text": "C'est que soit c'est lui qui a raison, soit ce sont eux, et cela tourne autour du nombre réel de produits.",
        "pause_after": 0.8
    },
    {
        "id": "part3_resultat",
        "text": "Résultat, on voit de nouveaux employés dans la boutique.",
        "pause_after": 0.5
    },
    {
        "id": "employe_nouveau",
        "voice": "fr-FR-EloiseNeural",
        "rate": "-2%",
        "pitch": "+2Hz",
        "text": "Bienvenue chez Alladji Takbir !"
    },
    {
        "id": "part4_solution",
        "text": "Pourtant, tout cela pourrait être évité juste s’il permettait à ses employés d’enregistrer systématiquement les sorties de produits à l’aide du logiciel Adék Solution.",
        "pause_after": 0.6
    },
    {
        "id": "part4_details",
        "text": "Il pourrait mieux contrôler les mouvements de stock, enregistrer les pertes de produits, suivre les ventes à crédit et connaître précisément les clients qui lui doivent de l’argent.",
        "pause_after": 0.6
    },
    {
        "id": "part5_serenite",
        "text": "Avec Adék Solution, il pourrait enfin avoir une vision claire de son stock, limiter les désaccords avec ses employés et gérer sa boutique en toute sérénité.",
        "pause_after": 1.0
    }
]

async def generate_all():
    os.makedirs("public/audio/takbir_full", exist_ok=True)
    narrator_voice = "fr-FR-HenriNeural"
    narrator_rate = "-6%"
    narrator_pitch = "-6Hz"
    
    for item in narration_parts:
        vid = item["id"]
        v = item.get("voice", narrator_voice)
        r = item.get("rate", narrator_rate)
        p = item.get("pitch", narrator_pitch)
        t = item["text"]
        out_f = f"public/audio/takbir_full/{vid}.mp3"
        comm = edge_tts.Communicate(t, v, rate=r, pitch=p)
        await comm.save(out_f)
        size = os.path.getsize(out_f)
        print(f"Generated {vid}.mp3 ({size} bytes)")

if __name__ == "__main__":
    asyncio.run(generate_all())
