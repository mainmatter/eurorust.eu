+++
title = "Containers Are Dead: Long Live WebAssembly"
template = "workshop.html"
[extra]
  sponsor = "Mainmatter"
  sponsor_bio = "We at Mainmatter are experts in Rust. We have been part of the Rust ecosystem for years, helping out the crates.io project. <br />We can support you in rewriting existing codebases to Rust, using Rust to accelerate hot modules in Python, Ruby, Node.js, or other languages, and in building new systems with Rust from scratch."
  sponsor_cta = "Learn more about our Rust expertise"
  sponsor_url = "https://mainmatter.com/rust/?utm_source=eurorust"
  mentors = [
    { name = "Jonas Kruckenberg", avatar = "jonas-kruckenberg.png", avatar_alt = "Jonas Kruckenberg",  bio = "I'm Jonas, open-sourcerer and builderer of things, working as a Software Engineer at Mainmatter.  I'm currently building the next generation Operating System. Previous work you might know: Tauri, vite-imagetools.",  url = "https://jonaskruckenberg.de/",  github = "JonasKruckenberg" }
  ]
  abstract = "Your backend services are working, but they're not thriving. Docker containers feel heavy, cold starts are slow, and your cloud bill keeps climbing. Security concerns keep you up at night, all while you’re fighting the spaghetti-stack to deliver features on a tight deadline. You've heard WebAssembly is the future, but it seems confined to browsers - can it solve your server-side problems?<br /><br />Yes it can! WebAssembly is starting to power anything from safety-critical embedded applications to large-scale web services. Employed correctly it gives you microsecond cold boot times, reliable sandboxing, safe user extensibility, and much more.<br /><br />In this hands-on workshop you will learn how to build such an efficient, portable, and secure server-side applications using Rust and WebAssembly. We’ll cover everything from foundational concepts to cutting edge features and by the end, you’ll have built a microservice in Rust, compiled it to WebAssembly, and deployed it using cutting-edge tooling. You’ll understand when this approach outshines containers, where the technology is headed, and how to incorporate these techniques into your existing infrastructure.<br /><br />We assume you are familiar with Rust and have heard of WebAssembly, but we don’t assume deep knowledge.  We will provide a brief explanation and references whenever we rely on advanced features."
  ogimage = "/images/workshops/og-images/og-image-webassembly.png"
  heroimage = "/images/workshops/hero-webassembly.webp"
  heroimage_alt = "Headstone spelling out RIP Containers"
+++

<div class="">
  <h2 class="mb-7">Syllabus</h2>
  <ol class="syllabus">
    <li class="mb-7 border">
      <h4>1. Foundations</h4>
      <div>
        <p>We start by introducing the basic concepts and building our first WebAssembly HTTP handler in Rust, from setup to deployment.</p>
        <p>Length: 90 minutes.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4>2. Building Real-World Services</h4>
      <div>
        <p>We then expand on our basic HTTP handler, looking at different Wasm runtimes, deployment options, and common backend patterns in WebAssembly.</p>
        <p>Length: 90 minutes.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4>3. Advanced Topics</h4>
      <div>
        <p>No production application is complete without tools to debug it. We will look debuggers, performance profiling tools, as well as monitoring solutions.</p>
        <p>We will then finish off by building expanding our HTTP handler yet again and - with everything we learned - build a simple calculator API service.</p>
        <p>Length: 120 minutes.</p>
      </div>
    </li>
  </ol>
</p>
</div>
