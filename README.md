<div align="center">

# SignBridge AI

**Sign-language translation platform.** A WLASL dataset pipeline and video-processing layer in Python, with a React/TypeScript interface built for both Deaf and hearing users.

[![CI](https://github.com/bashar-11/signbridge-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/bashar-11/signbridge-ai/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.10%2B-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)

**Status: work in progress.** The dataset pipeline and the interface are built and tested. The pose backend is not. See [What is built](#what-is-built) — this section is deliberately explicit so nobody has to dig to find out.

</div>

---

## The idea

Sign language has no written form, so most communication technology is built
one-directional: speech becomes text for someone who cannot hear. SignBridge is
designed around both directions instead:

- **Sign → Speech** — a Deaf signer produces sign, and the system renders it as
  speech for a hearing person.
- **Speech → Sign** — a hearing person speaks, and the system renders it as
  sign for a Deaf person.

The interface has a dedicated mode for each direction, and a separate screen for
the **avatar** presentation.

## What is built

| Area | State | Notes |
|---|---|---|
| WLASL dataset adapter | Done | Loads annotations, resolves videos, reports per-split statistics |
| Balanced subset selection | Done | Top-N glosses, capped per class, seeded and reproducible |
| Video I/O | Done | Reader, writer, metadata, frame-rate sampling |
| Keypoint storage | Done | Compressed `.npz` round-trip for body / hands / face |
| Pose backend contract | Defined | `BaseBackend` + `BasePoseEngine`, RTMO stub raises `NotImplementedError` |
| Frontend | Done | React 19 + Vite + TypeScript, typechecked and building in CI |
| RTMO inference | Not started | Blocked on the mmcv / mmpose install matrix |
| Classification model | Not started | — |
| Avatar rendering | Not started | — |

## Repository layout

```
signbridge-ai/
├── configs/
│   ├── paths.py            # Root/output paths, environment-overridable
│   └── dataset_config.py   # Subset size, per-class cap, seed
├── src/
│   ├── core/               # VideoReader, VideoWriter, VideoInfo, FrameSampler
│   ├── dataset/            # WLASL adapter, subset builder, factory
│   ├── pipelines/          # Batch extraction and dataset iteration
│   └── pose/               # Engine/backend contracts, keypoints, extraction
├── frontend/web/           # React 19 + Vite + TypeScript interface
├── docs/UI/                # Interface design specification
├── scripts/                # Small CLI utilities
└── tests/                  # pytest suite
```

## Getting started

```bash
git clone https://github.com/bashar-11/signbridge-ai.git
cd signbridge-ai

python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt
```

The core install is deliberately small (NumPy, pandas, OpenCV, tqdm, PyYAML).
The pose stack is separate — see below.

### The pose stack

`torch`, `mmpose` and `mmcv` are **not** in `requirements.txt`, on purpose.
mmcv compiles against a specific torch and CUDA build, so including it would
break `pip install -r requirements.txt` for almost everyone.

```bash
# CPU
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
pip install mmcv-lite
pip install -r requirements-pose.txt
```

For CUDA, follow the [mmcv installation matrix](https://mmcv.readthedocs.io/en/latest/get_started/installation.html) first.

## Dataset

The model is trained on **WLASL** (Word-Level American Sign Language). The
dataset is not in this repository. Point the code at your copy:

```bash
export WLASL_ROOT=/path/to/wlasl-processed
# Windows PowerShell
$env:WLASL_ROOT = "C:\path\to\wlasl-processed"
```

It must contain `WLASL_v0.3.json`, `wlasl_class_list.txt` and `videos/`.
Without `WLASL_ROOT`, the code looks in `data/raw/` locally and at the Kaggle
input mount when running on Kaggle.

### Why the subset is not the whole dataset

WLASL is strongly imbalanced — a few glosses have thousands of instances while
many have a handful. Training on the raw distribution teaches the model sign
*frequency*, not sign *appearance*. So the pipeline:

1. ranks glosses by instance count and keeps the top `TOP_K_WORDS` (default 100),
2. caps each at `VIDEOS_PER_CLASS` (default 22),
3. seeds the sampling (`RANDOM_SEED`) so the subset is reproducible.

```bash
python -m src.dataset.build_top100      # writes outputs/top100/.../top100_annotations.json
python -m src.dataset.copy_top100_videos # copies just those clips
```

## Frontend

```bash
cd frontend/web
npm ci
npm run dev        # development server
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build
```

Built with React 19, Vite, TypeScript, Tailwind and Radix UI. The interface is
**bilingual-ready** with right-to-left support. It currently runs against mock
data in `src/lib/mock.ts`; wiring it to the Python service is the next step.

## Development

```bash
pip install -r requirements.txt
pip install pytest ruff

ruff check src configs scripts tests
pytest tests -q
```

CI runs the Python suite, the frontend typecheck and build, and a dependency
audit on both ecosystems. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Design notes

- **No import side effects.** An earlier version of `configs/paths.py` created
  output directories at import time, which wrote to disk as a side effect of
  reading a config. Directory creation is now an explicit `ensure_output_dirs()`
  call.
- **Paths come from the environment.** Hardcoded Kaggle paths made the code
  Kaggle-only. `SIGNBRIDGE_ROOT` and `WLASL_ROOT` now override them, so the same
  code runs in both places.
- **Unimplemented backends raise.** `RTMOBackend` raises
  `NotImplementedError` instead of returning empty results, so a caller cannot
  mistake "not implemented" for "found nothing".
- **Heavy dependencies are optional.** `configs.paths` and the dataset layer
  import nothing heavy, which is why the tests run in seconds without OpenCV.

## Roadmap

- [ ] Wire up an RTMO backend against a pinned mmcv build
- [ ] Extract body / hand / face keypoints per clip
- [ ] Train and evaluate a sequence classifier over the keypoints
- [ ] Replace mock data with the Python service
- [ ] Add sign → speech synthesis
- [ ] Publish baseline accuracy on a held-out split

## Interface design

The interface specification, component library, design tokens and routing live
in [`docs/UI/`](docs/UI/README.md).

## License

[MIT](LICENSE) © 2026 Bashar Sayed

The WLASL dataset is redistributed by its original authors under its own terms
and is not included here.