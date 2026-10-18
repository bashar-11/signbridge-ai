"""
Iterate over the videos of a registered dataset.

WLASL is exposed as a pandas DataFrame by ``WLASLDataset.load()``, so this
pipeline iterates that table rather than the dataset object itself.
"""

from collections.abc import Iterator
from pathlib import Path

from src.dataset.dataset_factory import DatasetFactory


class DatasetPipeline:
    """Yields the video paths of a dataset, one at a time."""

    def __init__(self, dataset_name: str, dataset_root: str | Path) -> None:
        self.dataset = DatasetFactory.create(dataset_name, dataset_root)

    def videos(self) -> Iterator[str]:
        """Yield the path of every video the dataset exposes."""
        for path in self.dataset.load()["path"]:
            yield str(path)

    def statistics(self) -> dict:
        """Forward the dataset's own summary counts."""
        return self.dataset.statistics()
