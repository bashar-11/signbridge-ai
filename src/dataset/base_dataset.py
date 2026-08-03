from abc import ABC, abstractmethod
from pathlib import Path
import pandas as pd


class BaseDataset(ABC):
    """
    Abstract Base Dataset

    Every dataset adapter must inherit from this class.
    """

    def __init__(self, dataset_root):

        self.dataset_root = Path(dataset_root)

    @abstractmethod
    def load(self):
        """
        Return dataframe
        """
        pass

    @abstractmethod
    def classes(self):
        """
        Return class names
        """
        pass

    @abstractmethod
    def statistics(self):
        """
        Dataset statistics
        """
        pass