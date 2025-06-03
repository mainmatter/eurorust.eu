+++
title = "Rust-Python Inter&shy;operability"
template = "workshop.html"
[extra]
  sponsor = "Mainmatter"
  mentors = [
    { name = "Luca Palmieri", avatar = "luca-palmieri.png", avatar_alt = "Luca Palmieri",  bio = "Luca Palmieri builds technology products for a living. His current focus is on backend development, software architecture and the Rust programming language.<br /><br />He currently works at MainMatter as a Principal Engineering Consultant. He partners with teams across the industry to make sure they succeed in adopting or scaling their Rust usage, where it makes sense to do so. He was formerly at AWS and TrueLayer.<br /><br />He has been part of the Rust community since 2018 and is best known as the author of 'Zero to Production in Rust', an introduction to using Rust for backend development, and '100 Exercises to Learn Rust', a hands-on introduction to the language.<br /><br />When he is not coding, you’ll find him baking cakes or rolling pasta sheets.",  url = "https://www.lpalmieri.com/",  github = "LukeMathWalker" }
  ]
  abstract = "Python has served you well: you spun up a prototype and iterated quickly, keeping up with the evolving requirements of a successful product. Nonetheless, as time goes on, cracks are starting to show up: an endpoint is slower than it needs to be, a data processing job that took seconds now takes almost an hour, and your infrastructure bill is growing too fast compared to the size of your user base. Engineers are starting to whisper: is it time for a rewrite? Should we pause feature development to rebuild everything on more solid foundations? That's an option, but it's expensive.<br /><br />There's another path: rather than throwing away your entire Python codebase to start over, you analyse your application and isolate the performance-critical bits—the so-called 'hot modules' where your application spends most of its time. You will rewrite those in Rust and package them as a Python native extension. This workshop will teach you how.<br /><br />We will cover the <span>pyo3</span> crate, the subtleties of Python's Global interpreter lock, and typical examples that may arise in your daily Rust-Python interoperability work. By the end of the session, you will be well-equipped to seamlessly replace your slow Python modules with easy-to-use and blazingly fast Rust modules.<br /><br />We assume you are familiar with Rust and Python, but we don't assume any prior interoperability knowledge. We will provide a brief explanation and references whenever we rely on advanced features in either language."
  ogimage = "/images/workshops/og-images/og-image-rust-python.png"
  heroimage = "/images/workshops/hero-python.png"
  heroimage_alt = "Snake"
+++

<div class="">
  <h2 class="mb-7">Syllabus</h2>
  <ol>
    <li class="mb-7 border">
      <h4>1. Introduction to Rust-Python Inter&shy;operability</h4>
      <div>
        <p>We kick off with looking at the advantages of combining Rust and Python, understanding where each language shines and why interoperability is valuable. This module introduces tools like <span>PyO3</span>, which enables Rust code integration within Python environments, and <span>maturin</span>, a library for building, packaging and publishing Python extensions written in Rust.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4>2. Building Python Extensions in Rust</h4>
      <div>
        <p>We'll continue with the process of creating Python-callable Rust functions, setting up projects using <span>PyO3</span>, and configuring the development environment to handle Rust extensions in Python.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4>3. Managing Data and Types</h4>
      <div>
        <p>Next, participants will learn how to handle complex data structures shared between Rust and Python, with a focus on type conversions, data ownership, and ensuring memory safety across both languages.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4>4. Concurrency and the GIL</h4>
      <div>
        <p>The workshop covers Python’s Global Interpreter Lock (GIL) and strategies for concurrent programming, including async programming in Rust that can enhance Python’s parallel processing capabilities.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4>5. Creating Python Classes with Rust</h4>
      <div>
        <p>We move on to explore creating Python-accessible classes directly in Rust using <span>PyO3</span>'s <span>#[pyclass]</span> attribute. This module teaches struct definition, implementing methods, and adding Rust-based functionality to Python classes.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4>6. Static Methods and Inheritance</h4>
      <div>
        <p>The final module details adding static methods to Rust-backed Python classes, along with managing inheritance and visibility in Python environments.</p>
      </div>
    </li>
  </ol>
</p>
</div>
