import os
import wave
import contextlib

# For mp3 files, we can use edge_tts or mutagen or ffprobe or wave if wav,
# or we can read the duration using a simple python script or mutagen or wave.
# Let's inspect with a script that gets mp3 duration.

def get_mp3_duration(path):
    # approximate or precise
    import subprocess
    cmd = ['python', '-c', f'''
import wave, sys
# or use standard mutagen / chunk reading
with open(r"{path}", "rb") as f:
    # MPEG frame header parsing
    import struct
    f.seek(0, 2)
    size = f.tell()
    # at 128 kbps, 16000 bytes per second
    # let's do a quick calculation or use edge-tts vtt subtitles!
''']

if __name__ == '__main__':
    print("Helper ready")
