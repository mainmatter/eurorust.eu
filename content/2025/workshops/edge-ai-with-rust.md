+++
title = "Edge AI with Rust"
template = "2025/workshop.html"
[extra]
  sponsor = "Wyliodrin"
  sponsor_bio = "Wyliodrin is a French company specialized in embedded systems and full-stack software development, empowering industries to leverage cutting-edge technologies like Rust for maximum impact."
  sponsor_cta = "More about Wyliodrin"
  sponsor_url = "/2025/wyliodrin"
  mentors = [
    { name = "Alexandru Radovici, PhD.", avatar = "alexandru-radovici.webp", avatar_alt = "Alexandru Radovici",  bio = "Alexandru specialized in Operating Systems and Compiler and is a core contributor to Tock OS. He has published the first book on Tock OS kernel & application development. Alexandru has 20 years of experience in software engineering with a focus on embedded systems and IoT, with products delivered to industrial top players." }
  ]
  abstract = "Running AI models on edge devices, such as smartphones and wearables, opens up exciting opportunities. Rust is particularly well-suited for harnessing this potential and advancing how we deploy and reason with AI models on these devices.<br><br>In this hands-on workshop, you will explore practical, real-world scenarios while building essential skills and gaining a foundational understanding of embedded AI programming using Rust. Join us as we discover how Rust enables you to deploy and engage with AI applications on edge devices."
  ogimage = "/2025/images/workshops/og-images/og-image-edge-ai.png"
  heroimage = "/2025/images/workshops/hero-edge-ai.webp"
  heroimage_alt = "A smartwatch"
+++

<div class="">
  <h2 class="mb-7">Format</h2>
  <ol class="syllabus">
    <li class="mb-7 border">
      <h4>1. Intro</h4>
      <div>
        <ol>
          <li class="mb-2">Team – experience</li>
          <li>Ecosystem
            <ul>
              <li>Statistics - interest in rust & AI</li>
              <li>Motivating for edge AI</li>
              <li>Workshop overview</li>
            </ul>
          </li>
        </ol>
      </div>
    </li>
    <li class="mb-7 border">
      <h4>2. Lecture: Deep Learning for Computer Vision</h4>
      <div>
        <ol>
          <li class="mb-2">
            Introduce WasmEdge / Rust for edge devices
            <ol>
              <li>High level overview of WebAssembly and the WebAssembly Component Model</li>
              <li>What is WasmEdge?</li>
              <li>An example of a WasmEdge Rust application</li>
            </ol>
          </li>
          <li class="mb-2">
            Lecture on Computer Vision
            <ol>
              <li>High-level introduction to computer vision tasks / problems: classification, object detection, segmentation</li>
              <li>What exactly is a neural network? High-level introduction to CNNs.</li>
              <li>What exactly is an (image) embedding?</li>
              <li>Common libraries in the ecosystem (from python: PyTorch, 🤗HuggingFace, etc)</li>
            </ol>
          </li>
          <li class="mb-2">
            Introduce Rust libraries for AI
            <ol>
              <li>Compare the use of Rust in deep learning compared to Python, showcase equivalent libraries</li>
              <li>Candle - Lightweight minimalist ML framework for Rust that allows the use of 🤗HuggingFace models</li>
              <li>Mediapipe-rs - for on edge Computer Vision</li>
              <li>WasmEdge - running LlamaEdge for deploying LLMs</li>
            </ol>
          </li>
          <li>
            HuggingFace (presented by HuggingFace)
            <ol>
              <li>Platform
                <ol>
                  <li>resources, search, selection</li>
                  <li>Deployment</li>
                  <li>Rust & HuggingFace - Candle</li>
                </ol>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </li>
    <li class="mb-7 border">
      <h4>3. Hands-on: Air-gapped face recognition on Pi</h4>
      <div>
        <p>Use pretrained models from mediapipe-rs and HuggingFace🤗 to build a simple Face
          Authentication pipeline</p>
          <ol>
            <li>Stream video input from webcam to Raspberry Pi server</li>
            <li>Deploy a Face Detection model on the Raspberry Pi</li>
            <li>Deploy an Face Embedding model on the Raspberry Pi</li>
            <li>Save identities to a vector database like QDrant Rust SDK</li>
            <li>Perform privacy-preserving on-device authentication</li>
          </ol>
      </div>
    </li>
    <li class="mb-7 border">
      <h4>4. Lecture: Deep Learning for NLP</h4>
      <div>
        <ol>
          <li class="mb-2">Introduction to Deep Learning for NLP
            <ol>
              <li>Overview of the history of NLP methods</li>
              <li>Development of Transformers</li>
            </ol>
          </li>
          <li class="mb-2">How does an LLM work? Tokenizers, pre-training, post-training.</li>
          <li class="mb-2">High-level introduction to concepts about prompt engineering: Chain-of-Thought, RAG, In-Context Learning</li>
          <li class="mb-2">What exactly is a (text) embedding?</li>
          <li class="mb-2">
            Introduce Rust libraries for NLP – Rust is actively used for developing the ecosystem around training LLMs (e.g., tokenizers)
            <ol>
              <li>tokenizers - Rust - A Fast version of the tokenizers library used ubiquitously in the LLM ecosystem</li>
              <li>llama.cpp</li>
            </ol>
          </li>
        </ol>
      </div>
    </li>
    <li class="mb-7 border">
      <h4>5. Hands-on: Chat with a LLM on Pi</h4>
      <div>
        <ol>
          <li class="mb-2">Deploy a small, pretrained LLM on a Raspberry Pi</li>
          <li class="mb-2">Chat with the LLM</li>
          <li class="mb-2">Stream responses from the server (async)</li>
          <li class="mb-2">
            Build a simple RAG pipeline
            <ol>
              <li>Embed some (given) texts using a text embedding model (i.e., BERT)</li>
              <li>Store texts & embeddings into QDrant vector store</li>
              <li>LLM can retrieve relevant passages from the vector store to answer questions</li>
              <li>Agentic RAG – Before retrieving passages, use the LLM to summarize passages/select the most important bits</li>
            </ol>
          </li>
        </ol>
      </div>
    </li>
    <li class="mb-7 border">
      <h4>6. Hands-on: Integration</h4>
      <div>
        <p>Integrate both computer vision models and LLMs into a single application.</p>
        <ol>
          <li class="mb-2">Develop an application that can register a user using Face Authentication</li>
          <li class="mb-2">Adapt the deployed LLM to handle tool calling using system prompts</li>
          <li class="mb-2">Users can input a free-text description of their preferences, which the LLM parses into a predefined set</li>
          <li class="mb-2">Finally, users can be identified from their faces and can issue commands to the LLM assistant, and the assistant can respond based on their declared preferences.</li>
        </ol>
      </div>
    </li>
  </ol>
</p>
</div>
