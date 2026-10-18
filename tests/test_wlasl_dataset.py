"""
Tests for the WLASL dataset adapter.

A miniature dataset is written to a temporary directory so these run without
downloading anything.
"""

import json

import pytest

from src.dataset.base_dataset import BaseDataset
from src.dataset.dataset_factory import DatasetFactory
from src.dataset.wlasl_dataset import WLASLDataset


@pytest.fixture()
def fake_wlasl(tmp_path):
    """Build a WLASL-shaped dataset with two signs and one orphan video."""
    root = tmp_path / "wlasl"
    videos = root / "videos"
    videos.mkdir(parents=True)

    annotations = [
        {
            "gloss": "hello",
            "instances": [
                {"video_id": "hello_0", "split": "train", "signer_id": 1, "fps": 25},
                {"video_id": "hello_1", "split": "val", "signer_id": 2, "fps": 25},
            ],
        },
        {
            "gloss": "thanks",
            "instances": [
                {"video_id": "thanks_0", "split": "train", "signer_id": 1, "fps": 30},
                {"video_id": "missing_0", "split": "test", "signer_id": 2, "fps": 30},
            ],
        },
    ]
    (root / "WLASL_v0.3.json").write_text(json.dumps(annotations), encoding="utf-8")
    (root / "wlasl_class_list.txt").write_text("hello\nthanks\n", encoding="utf-8")

    for name in ("hello_0", "hello_1", "thanks_0"):
        (videos / f"{name}.mp4").write_bytes(b"not a real video")

    return root


class TestWLASLDataset:
    def test_is_a_base_dataset(self, fake_wlasl):
        assert isinstance(WLASLDataset(fake_wlasl), BaseDataset)

    def test_load_returns_a_dataframe_with_expected_columns(self, fake_wlasl):
        df = WLASLDataset(fake_wlasl).load()
        for column in ["video_id", "gloss", "split", "signer_id", "fps", "path"]:
            assert column in df.columns

    def test_skips_annotations_whose_video_is_absent(self, fake_wlasl):
        # "missing_0" has no file on disk and must not become a sample.
        df = WLASLDataset(fake_wlasl).load()
        assert "missing_0" not in set(df["video_id"])
        assert len(df) == 3

    def test_path_points_at_a_real_file(self, fake_wlasl):
        df = WLASLDataset(fake_wlasl).load()
        for path in df["path"]:
            assert str(path).endswith(".mp4")

    def test_classes_are_read_from_the_class_list(self, fake_wlasl):
        assert WLASLDataset(fake_wlasl).classes() == ["hello", "thanks"]

    def test_statistics_report_splits(self, fake_wlasl):
        stats = WLASLDataset(fake_wlasl).statistics()
        assert stats["videos"] == 3
        assert stats["classes"] == 2
        assert stats["train"] == 2
        assert stats["val"] == 1

    def test_missing_annotation_file_raises(self, tmp_path):
        (tmp_path / "videos").mkdir()
        with pytest.raises(FileNotFoundError):
            WLASLDataset(tmp_path).load()


class TestDatasetFactory:
    def test_creates_the_wlasl_adapter(self, fake_wlasl):
        assert isinstance(DatasetFactory.create("wlasl", fake_wlasl), WLASLDataset)

    def test_is_case_insensitive(self, fake_wlasl):
        assert isinstance(DatasetFactory.create("WLASL", fake_wlasl), WLASLDataset)

    def test_unknown_dataset_raises(self, fake_wlasl):
        with pytest.raises(ValueError):
            DatasetFactory.create("jargon", fake_wlasl)