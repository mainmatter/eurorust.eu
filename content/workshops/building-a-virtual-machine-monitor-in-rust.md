+++
title = "Building a virtual machine monitor in Rust"
template = "workshop.html"

[[extra.mentors]]
name = "Johan Sannemo"
avatar = "johan-sannemo.webp"
avatar_alt = "Johan Sannemo"
bio = "<p>Johan Sannemo builds the infrastructure other people's code runs on. His focus is on virtualization, sandboxing, and systems programming in Rust.</p><p>He works at Modal, the serverless compute platform, where untrusted code runs securely for some of the most demanding, highly scalable customers in the industry. He has a background in computer security and a long-running hobby of building sandboxing solutions for Linux systems.</p>"

[extra]
  price = 400
  sponsor = "Modal"
  sponsor_bio = "Run inference, training, batch processing, and sandboxes with sub-second cold starts, instant autoscaling, and a developer experience that feels local."
  sponsor_cta = "Visit our website"
  sponsor_url = "https://modal.com/"
  abstract = "<p>Virtual machines power a large part of the modern software engineering stack. Most cloud workloads run as virtual machines on top of a Linux-based virtual machine monitor: your API servers, your CI, and sometimes even your development environment all run as a virtual machine on someone else's hardware. But how does it work under the hood?</p><p>Thanks to the tools offered by modern CPUs, operating systems, and Rust libraries, building your own virtual machine monitor has never been easier. Starting from nothing, we'll build up your knowledge of virtualization and write our own hypervisor capable of launching Linux.</p>"
  description = "<p>In this workshop you'll build a virtual machine monitor (VMM) in Rust, and learn the theory behind hardware-accelerated virtualization.</p><p>You'll learn about:</p><ul class='syllabus'><li>how your hardware helps make virtualization efficient with the VT-x and AMD-V instruction set extensions,</li><li>how the KVM subsystem in Linux exposes virtualization tools to user space,</li><li>how devices such as storage and networking work in a virtualized setting,</li></ul><p>and, using all that knowledge, you'll build your own VMM that can launch a Linux kernel.</p>"
  prerequisites = "<p>You will need to bring a laptop with an SSH client for the practical exercises. We will provide you with a cloud instance you can SSH into that supports nested virtualization, so you don't have to worry about compatibility with your laptop.</p><p>You should be comfortable coding in Rust, but you don't need to know about virtualization or CPU internals. We'll cover what we need from scratch.</p>"
  ogimage = "/images/workshops/og-images/og-image-hypervisor-rust.webp"
  heroimage = "/images/workshops/hypervisor-rust.webp"
  heroimage_alt = "Stylized virtual machine monitor with three virtual machines"
  venue = "tba"
+++
