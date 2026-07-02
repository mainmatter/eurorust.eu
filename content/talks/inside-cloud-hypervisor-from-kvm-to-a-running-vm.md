+++
title = "Inside Cloud Hypervisor: From KVM to a Running VM"
template = "talk.html"
[extra]
  speakers = ["philipp-schuster"]
  description = "<p>What actually happens when a virtual machine starts? This talk takes a deep dive into Cloud Hypervisor, an open-source Rust-based Virtual Machine Monitor, and follows the path from creating a KVM VM to booting a guest. We will look at the main building blocks involved - guest memory, vCPUs, and devices - and explain how they come together to form a running virtual machine.</p><p>Rather than treating a VM as a black box, this talk explains what a modern VMM has to do to turn a host process into a running VM. Along the way, we will discuss why Cloud Hypervisor is structured the way it is, how Rust helps manage complexity, and where unsafe code, kernel interfaces, and hardware assumptions still matter.</p><p>From a developer’s perspective, I will also show typical Rust workflows in this space: building and testing Cloud Hypervisor, debugging across host and guest boundaries, inspecting runtime behavior, and iterating on changes in a complex systems codebase.</p>"
  ogimage = "/images/talks/og-images/inside-cloud-hypervisor-from-kvm-to-a-running-vm.jpg"
+++
