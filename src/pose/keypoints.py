"""
Unified Keypoint Representation
"""

from dataclasses import dataclass
from pathlib import Path

import numpy as np


@dataclass
class PoseSequence:

    body: np.ndarray

    left_hand: np.ndarray

    right_hand: np.ndarray

    face: np.ndarray

    fps: float

    total_frames: int

    label: str


def save_keypoints(
    sequence: PoseSequence,
    output_path: Path,
):

    output_path.parent.mkdir(parents=True, exist_ok=True)

    np.savez_compressed(

        output_path,

        body=sequence.body,

        left_hand=sequence.left_hand,

        right_hand=sequence.right_hand,

        face=sequence.face,

        fps=sequence.fps,

        total_frames=sequence.total_frames,

        label=sequence.label,

    )


def load_keypoints(path: Path) -> PoseSequence:

    data = np.load(path, allow_pickle=True)

    return PoseSequence(

        body=data["body"],

        left_hand=data["left_hand"],

        right_hand=data["right_hand"],

        face=data["face"],

        fps=float(data["fps"]),

        total_frames=int(data["total_frames"]),

        label=str(data["label"]),

    )