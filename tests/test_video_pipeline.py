"""
Tests for the video I/O layer.

`FrameSampler`, `is_video_file` and the keypoint round-trip are pure Python and
NumPy, so they run without OpenCV or a GPU. `VideoReader` needs a real file and
is exercised by `tests/test_video_io.py`, which skips when no sample is present.
"""

import numpy as np
import pytest

from src.core.frame_sampler import FrameSampler
from src.pose.keypoints import PoseSequence, load_keypoints, save_keypoints
from src.pose.utils import ensure_directory, is_video_file


class TestFrameSampler:
    def test_passes_frames_through_when_source_is_slow(self):
        frames = list(range(10))
        assert FrameSampler(target_fps=25).sample(frames, original_fps=10) == frames

    def test_keeps_every_frame_at_matching_rate(self):
        frames = list(range(50))
        assert len(FrameSampler(target_fps=25).sample(frames, original_fps=25)) == 50

    def test_thins_out_a_faster_source(self):
        frames = list(range(100))
        sampled = FrameSampler(target_fps=25).sample(frames, original_fps=50)
        assert 0 < len(sampled) < 100
        assert sampled[0] == frames[0]

    def test_result_keeps_original_order(self):
        frames = list(range(200))
        sampled = FrameSampler(target_fps=10).sample(frames, original_fps=60)
        assert sampled == sorted(sampled)

    def test_samples_a_realistic_downscale(self):
        # 30 fps down to 10 fps should keep roughly a third of the frames.
        frames = list(range(300))
        sampled = FrameSampler(target_fps=10).sample(frames, original_fps=30)
        assert 90 <= len(sampled) <= 110

    def test_empty_input_is_safe(self):
        assert FrameSampler(target_fps=25).sample([], original_fps=60) == []


class TestIsVideoFile:
    @pytest.mark.parametrize("name", ["a.mp4", "b.MOV", "c.avi", "d.mkv", "e.webm"])
    def test_accepts_video_extensions(self, tmp_path, name):
        assert is_video_file(tmp_path / name)

    @pytest.mark.parametrize("name", ["a.txt", "b.json", "c.png", "d.mp3"])
    def test_rejects_other_extensions(self, tmp_path, name):
        assert not is_video_file(tmp_path / name)

    def test_accepts_a_path_with_no_suffix(self, tmp_path):
        assert not is_video_file(tmp_path / "file")


class TestEnsureDirectory:
    def test_creates_nested_directories(self, tmp_path):
        target = tmp_path / "a" / "b" / "c"
        ensure_directory(target)
        assert target.is_dir()

    def test_is_idempotent(self, tmp_path):
        target = tmp_path / "x"
        ensure_directory(target)
        ensure_directory(target)
        assert target.is_dir()


class TestKeypointRoundTrip:
    def _sequence(self) -> PoseSequence:
        rng = np.random.default_rng(0)
        return PoseSequence(
            body=rng.random((10, 3)).astype(np.float32),
            left_hand=rng.random((21, 3)).astype(np.float32),
            right_hand=rng.random((21, 3)).astype(np.float32),
            face=rng.random((5, 3)).astype(np.float32),
            fps=25.0,
            total_frames=10,
            label="hello",
        )

    def test_round_trip_preserves_every_field(self, tmp_path):
        original = self._sequence()
        target = tmp_path / "nested" / "hello.npz"
        save_keypoints(original, target)
        loaded = load_keypoints(target)

        assert loaded.label == original.label
        assert loaded.fps == pytest.approx(original.fps)
        assert loaded.total_frames == original.total_frames
        assert np.allclose(loaded.body, original.body)
        assert np.allclose(loaded.left_hand, original.left_hand)
        assert np.allclose(loaded.right_hand, original.right_hand)
        assert np.allclose(loaded.face, original.face)

    def test_save_creates_missing_directories(self, tmp_path):
        target = tmp_path / "does" / "not" / "exist" / "seq.npz"
        save_keypoints(self._sequence(), target)
        assert target.exists()

    def test_output_is_compressed(self, tmp_path):
        # save_keypoints uses np.savez_compressed. Compression only shows up on
        # compressible input, so this uses highly repetitive keypoints (as a
        # padded or zero-filled pose sequence produces) rather than random
        # noise, which no codec can shrink.
        sequence = PoseSequence(
            body=np.zeros((200, 3), dtype=np.float32),
            left_hand=np.zeros((200, 3), dtype=np.float32),
            right_hand=np.zeros((200, 3), dtype=np.float32),
            face=np.zeros((200, 3), dtype=np.float32),
            fps=25.0,
            total_frames=200,
            label="hello",
        )
        target = tmp_path / "seq.npz"
        save_keypoints(sequence, target)
        raw = sum(
            a.nbytes
            for a in (sequence.body, sequence.left_hand, sequence.right_hand, sequence.face)
        )
        assert target.stat().st_size < raw / 4