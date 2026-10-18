"""
Tests for the dataset subset selection.

This is the step that decides what the model trains on, so the guarantees it
claims — reproducibility, the per-class cap, and dropping rare classes — are
asserted directly rather than assumed.
"""

from src.dataset.build_top100 import select_top_classes


def make_gloss(word: str, count: int) -> dict:
    return {
        "gloss": word,
        "instances": [{"video_id": f"{word}_{i}"} for i in range(count)],
    }


class TestSelectTopClasses:
    def test_keeps_only_the_most_frequent_glosses(self):
        data = [make_gloss("rare", 2), make_gloss("common", 50), make_gloss("mid", 10)]
        kept = select_top_classes(data, top_k=2, per_class=100)
        words = {s["gloss"] for s in kept}
        assert words == {"common", "mid"}
        assert "rare" not in words

    def test_caps_instances_per_class(self):
        data = [make_gloss("common", 50)]
        kept = select_top_classes(data, top_k=1, per_class=5)
        assert len(kept[0]["instances"]) == 5

    def test_never_expands_a_small_class(self):
        data = [make_gloss("small", 3)]
        kept = select_top_classes(data, top_k=1, per_class=22)
        assert len(kept[0]["instances"]) == 3

    def test_is_reproducible_across_calls(self):
        data = [make_gloss(f"w{i}", 40) for i in range(8)]
        first = select_top_classes(data, top_k=4, per_class=6, seed=42)
        second = select_top_classes(data, top_k=4, per_class=6, seed=42)
        assert first == second

    def test_a_different_seed_can_pick_a_different_subset(self):
        data = [make_gloss(f"w{i}", 40) for i in range(8)]
        a = select_top_classes(data, top_k=4, per_class=6, seed=1)
        b = select_top_classes(data, top_k=4, per_class=6, seed=2)
        # Same classes, but the sampled instances should differ.
        assert {s["gloss"] for s in a} == {s["gloss"] for s in b}
        assert a != b

    def test_does_not_mutate_the_input(self):
        data = [make_gloss("common", 50)]
        original = len(data[0]["instances"])
        select_top_classes(data, top_k=1, per_class=3)
        assert len(data[0]["instances"]) == original

    def test_handles_an_empty_dataset(self):
        assert select_top_classes([], top_k=5, per_class=5) == []

    def test_preserves_total_counts_within_cap(self):
        data = [make_gloss("a", 30), make_gloss("b", 30), make_gloss("c", 1)]
        kept = select_top_classes(data, top_k=2, per_class=10)
        assert sum(len(s["instances"]) for s in kept) == 20
