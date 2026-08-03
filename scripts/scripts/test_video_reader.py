from pathlib import Path

from src.core.video_reader import VideoReader

video = Path(
    "ضع هنا أي فيديو من WLASL"
)

reader = VideoReader(video)

info = reader.get_info()

print(info)

count = 0

for frame in reader.read():

    count += 1

print("Frames :", count)

reader.release()