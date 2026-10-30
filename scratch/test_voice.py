import edge_tts
import asyncio
import os

os.makedirs('scratch', exist_ok=True)

async def test_voices():
    sample_text = "Alladji Tacbir souffre d'un seul problème : le nombre de ses produits."
    voices = [
        ('fr-FR-RemyMultilingualNeural', 'remy', '-4%', '-6Hz'),
        ('fr-FR-HenriNeural', 'henri', '-4%', '-8Hz'),
        ('fr-BE-GerardNeural', 'gerard', '-4%', '-6Hz'),
    ]
    for v, name, rate, pitch in voices:
        out_path = f'scratch/voice_{name}.mp3'
        communicate = edge_tts.Communicate(sample_text, v, rate=rate, pitch=pitch)
        await communicate.save(out_path)
        print(f"Generated {out_path}, size={os.path.getsize(out_path)}")

if __name__ == '__main__':
    asyncio.run(test_voices())
