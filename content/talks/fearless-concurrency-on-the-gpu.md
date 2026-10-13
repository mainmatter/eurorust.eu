+++
title = "Fearless Concurrency on the GPU"
template = "talk.html"
[extra]
  speakers = ["melih-elibol"]
  description = "<p>You don't need to be a GPU expert to write high-performance GPU code in safe Rust. This talk introduces cuTile Rust, an open source system that brings Rust's ownership model to GPU programming. Its multidimensional Tile type lets you perform operations similar to those available in NumPy for ndarrays and PyTorch for tensors. GPU functions load tiles from tensors in GPU memory, compute on them, and store the results. The Rust compiler checks them under the same ownership rules as the rest of your program, and NVIDIA's Tile IR compiler handles their execution across different NVIDIA GPUs. If it compiles, it has no data races.</p><p>We'll go through a short, simple program line by line to show you how it works. Like you would in Rayon, you partition mutable data into disjoint pieces and share read-only inputs. cuTile Rust's runtime carries those ownership guarantees through data movement and GPU function calls. The same operations can run synchronously, as ordinary Rust futures, or as CUDA graphs recorded once and replayed. Our futures are optimized for low-latency GPU work, and any async runtime can schedule them alongside the rest of your application.</p>"
  ogimage = "/images/talks/og-images/fearless-concurrency-on-the-gpu.webp"
+++
