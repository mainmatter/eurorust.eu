+++
title = "I/O in Rust: the whole story"
template = "2024/talk.html"
[extra]
  date = "Oct. 11th, Friday"
  time = "13:30 - 14:00"
  speakers = ["vitaly-bragilevsky"]
  description = "<p>Many applications require as efficient input-output (I/O) as possible, including tasks such as reading from a disk or a network connection. However, I/O devices are known to be slow compared to CPUs and RAM. This contrast leads to various approaches for organizing I/O, ranging from step-by-step operations to enabling devices to write directly to main memory using Direct Memory Access (DMA). These methods correspond to different OS interfaces, from blocking I/O operations to highly asynchronous calls, and even emerging interfaces like io_uring, a new Linux kernel I/O interface. In this talk, we’ll explore I/O on three parallel levels: devices, operating system calls, and Rust code. It’s crucial to understand that software efficiency regarding I/O critically depends on the specific operations in use. Even more importantly, Rust code does not work in isolation—it relies on specific OS features and interfaces. Thus, we should learn about our Rust coding choices and their underlying implementations. There’s one more aspect: due to this dependency on OS interfaces, it’s impossible to implement a once-and-for-all solution that works across all operating systems at the most efficient level. However, by examining practical examples, we can discover some effective workarounds. Rust already enables us to write highly performant software. By deepening our understanding of I/O internals, we can make our code even more efficient!</p>"
  ogimage = "2024/images/talks/og-images/io-in-rust-the-whole-story.png"
+++
