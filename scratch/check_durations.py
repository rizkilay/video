import os
import struct

def get_mp3_duration_exact(path):
    # Quick accurate mp3 length parser or use edge_tts with communicate.save or mutagen if installed
    # We can also use python to decode with cv2 if video, or read with edge_tts / simple mp3 header scan
    with open(path, "rb") as f:
        data = f.read()
    
    # Simple MP3 frame parser
    i = 0
    duration = 0.0
    bitrates = [
        [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320], # v1, l3
    ]
    sample_rates = [44100, 48000, 32000] # MPEG 1
    # edge-tts defaults to 24000Hz mono 48kbps or similar (audio-24khz-48kbitrate-mono-mp3)
    
    # Or simply: edge-tts file size / bitrate
    # Let's check size
    size = len(data)
    # Default format is 'audio-24khz-48kbitrate-mono-mp3' -> 48000 bits / 8 = 6000 bytes / sec
    # Let's verify by checking header
    # If edge-tts uses 24kHz / 48kbps:
    approx_sec = size / 6000.0
    return approx_sec

files = [
    "public/audio/takbir/scene1.mp3",
    "public/audio/takbir/scene2.mp3",
    "public/audio/takbir/scene3.mp3",
    "public/audio/takbir/scene4_solution.mp3",
    "public/audio/takbir/scene4_details.mp3",
    "public/audio/takbir/scene5_serenite.mp3"
]

for f in files:
    if os.path.exists(f):
        print(f, os.path.getsize(f), "bytes", f"{os.path.getsize(f)/6000:.2f}s (est)")
