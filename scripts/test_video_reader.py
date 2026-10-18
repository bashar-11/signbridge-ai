"""
Inspect a video file: metadata, frame count and average FPS.

Usage:
    python scripts/test_video_reader.py path/to/clip.mp4
"""

import argparse
import sys
import time
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Report metadata for a video file.")
    parser.add_argument("video", help="Path to the video file.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    # Imported here so that --help works without OpenCV installed.
    from src.core.video_reader import VideoReader

    path = Path(args.video)
    if not path.exists():
        print(f"File not found: {path}", file=sys.stderr)
        return 1

    started = time.time()
    reader = VideoReader(path)
    try:
        info = reader.get_info()
        print("=" * 46)
        print("VIDEO INFO")
        print("=" * 46)
        print(f"Path     : {info.path}")
        print(f"Size     : {info.width} x {info.height}")
        print(f"FPS      : {info.fps:.2f}")
        print(f"Frames   : {info.frame_count}")
        print(f"Duration : {info.duration:.2f}s")

        count = 0
        for _ in reader.read():
            count += 1
        print(f"Decoded  : {count} frames in {time.time() - started:.2f}s")

        if count != info.frame_count:
            # Not fatal: some containers report an estimate rather than a count.
            print(f"Note     : container reports {info.frame_count} frames, decoded {count}")
        print("=" * 46)
    finally:
        reader.release()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())