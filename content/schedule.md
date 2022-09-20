+++
template = "schedule.html"

[[extra.days]]
	day="1"
	date="October, 13 - Thursday"
[[extra.days.talks]]
	time="9:00 -  10:00"
	title="Doors open & Breakfast"
	isBreak=true
[[extra.days.talks]]
	time="10:00 - 10:30"
	id="daniel-stenberg"
	speaker="Daniel Stenberg"
	title="curl with Rust"
	description="<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
[[extra.days.talks]]
	time="10:45 - 11:15"
	id="lukas-bergdoll"
	speaker="Lukas Bergdoll"
	title="Optimising stable sort in Rust and mostly failing"
	description="""
	<p>Inspired by a promising C sort implementation, I set to porting it to Rust. Over the course of a couple months I build a suite of tests and benchmarks that helped me develop and validate improvements to the existing slice::sort implementation in the Rust standard library. Along this journey I made all kinds of different mistakes, ranging from basic implementation errors, to subtle test methodology issues, and even more subtle issues I’m not even sure are technically bugs but yielded very surprising results. I want to share my experiences and learnings.</p>

	<p>This talk assumes basic Rust knowledge, and will touch on speculative execution and the effects it has on Instruction Level Parallelism (ILP). It does not require knowledge about sorting algorithms. The methods I used and mistakes I’ve made also apply to other fields of programming.</p>
	"""
[[extra.days.talks]]
	time="11:30 - 12:00"
	id="pietro-albini"
	speaker="Pietro Albini"
	title="The life of a Rust security vulnerability"
	description="""
	<p>The Rust Security Response WG is responsible for receiving reports about Rust vulnerabilities, disclosing the vulnerability to the public, and assisting the Rust project teams when developing the fix. The WG is crucial for the security of the Rust ecosystem, but most of its work has to be kept private to prevent vulnerabilities from leaking.</p>

	<p>In this talk, a member of the WG explains how it operates and handles vulnerabilities. During the talk we’ll walk through <a href="https://blog.rust-lang.org/2022/01/20/cve-2022-21658.html" alt="Security advisory for the standard library (CVE-2022-21658)">CVE-2022-21658 (race condition in std::fs::remove_dir_all)</a>, from the moment we received the report to the public disclosure.</p>
	"""

[[extra.days.talks]]
	time="12:00 - 13:00"
	title="Lunch"
	isBreak=true
[[extra.days.talks]]
	time="13:00 - 13:30"
	id="rainer-stropek"
	speaker="Rainer Stropek"
	title="Building Web APIs with Rust - State of the Union"
	description="""
	<p>Many people primarily see Rust as a platform for doing systems programming. It is great in that area, but you can do so much more with Rust. In this talk, Rainer will focus on how to build web APIs with Rust. Modern web APIs typically run in the cloud and Rust’s ability to produce small and blazingly fast apps is perfectly suited for keeping your cloud bills small.</p>

	<p>In his talk, Rainer will do a high-level comparison of frameworks like Actix, Rocket, Warp, Axum, and/or Tide. How does typical API code look like in these frameworks? What are the most fundamental abstractions in them? How active and mature are they? Rainer will prepare a sample and use it to show similarities and differences. In addition to traditional frameworks, Rainer will also speak about Wasm-based options like WAGI and Spin and put them in perspective.</p>

	<p>The session will be code-heavy. The audience should have a solid understanding of the Rust programming language. However, people attending this session do not need to be Rust experts with years of practical experience. The general messages of the talk should be understandable for people who want to build web APIs and are in the process of evaluating whether they should invest more time in learning Rust.</p>
	"""
[[extra.days.talks]]
	time="13:45 - 14:15"
	id="rafael-epplee"
	speaker="Rafael Epplée"
	title="End-to-end Testing Your Rust Backend"
	description="""
	<p>More and more, Rust is used to write web backends. It has excellent testing support out of the box, but end-to-end testing web backends can bring new challenges. Database access needs to be isolated, leading to slow test suites. The sheer amount of features to test and Rust’s low-level style can make test code large and hard to read. In the relatively young ecosystem, there are no widely known patterns or libraries to address these problems.</p>

	<p>We’ll look at approaches to improving test performance and developer experience around end-to-end tests for Rust web backend applications:</p>

	<ul>
		<li>Various techniques for managing and isolating requests to SQL databases without sacrificing parallel test execution</li>
		<li>Building domain-specific tools to simplify test code and automatically provide tests for new features</li>
		<li>Using the <a href="https://crates.io/crates/rstest" alt="rstest crate">rstest crate</a> to simplify test setup and fixtures</li>
	</ul>

	<p>The content is suited for beginning and intermediate backend developers looking for ideas to increase the robustness of their web applications through easy and enjoyable testing. Due to Rust’s focus on correctness, testing for web applications has received less attention than it deserves, so I hope this talk will also spark some discussion around this topic.</p>
	"""
[[extra.days.talks]]
	time="14:30 - 15:00"
	id="stefan-baumgartner"
	speaker="Stefan Baumgartner"
	title="Trials, Traits, and Tribulations"
	description="""
	<p>We have all been there: The sprint’s closing, a deadline is about to arrive, and our feature needs to be shipped. Our best intentions are thrown overboard and we’re done when the compiler is happy with our work. <i>Don’t panic!</i> – But let’s throw a little <code>unwrap</code> in there, what could go wrong? Famous last words.</p>

	<p>Rinse and repeat, and you’ll end up with winding, unwieldy functions, and kitchen sink structs, that past you wrote, but future you will have a hard time understanding. Let’s help ourselves, and all our colleagues, and refactor to something better. All we need to do is to remember some unique features of Rust, and implement the right traits for the right structs.</p>

	<p>In this talk, we will refactor a single function with hundreds of lines of code together. We will learn to leverage expressions, define clear error boundaries, and implement standard library traits that align our code with Rust’s broader ecosystem. The result will be expressive, clear, and hopefully nothing else but beautiful.</p>
	"""
[[extra.days.talks]]
	time="15:00 - 15:30"
	title="Snack Break"
	isBreak=true
[[extra.days.talks]]
	time="15:30 - 16:00"
	id="francois-mockers"
	speaker="François Mockers"
	title="Bevy, WASM and the browser"
	description="""
	<p><a href="https://bevyengine.org/" alt="Bevy, a refreshingly simple data-driven game engine built in Rust Free and Open Source Forever!">Bevy</a> is a game engine using an Entity - Component - System architecture and a modern renderer. One of its main goal is to be cross-platform, and that means supporting WASM running in the browser!</p>

	<p>We’ll see how Bevy uses a few crates to interact with the browser:</p>

	<ul>
		<li><a href="https://crates.io/crates/winit" alt="winit crate">winit</a> to get a canvas and all the interactions</li>
		<li><a href="https://wgpu.rs/" alt="wgpu official page">wgpu</a> to render, in WebGL2 for now, and soon WebGPU</li>
		<li><a href="https://crates.io/crates/web-sys" alt="web-sys create">web-sys</a> (and <a href="https://crates.io/crates/js-sys" alt="js-sys crate">js-sys</a>) to handle some (light) multithreading and game assets access</li>
	</ul>

	<p>And the limitations, around multithreading, renderer, native library usage and networking.</p>

	<p>We’ll finish with some patterns on how to interact between a Bevy game and the JS world of the browser.</p>
	"""
[[extra.days.talks]]
	time="16:15 - 16:45"
	id="alberto-schiabel"
	speaker="Alberto Schiabel"
	title="No free lunch: limits of Wasm as a bridge from Rust to JS"
	description="""
	<p>Traditionally, Node.js has delegated the task of writing complex CPU-intensive logic to C++, but the increasing adoption of Rust and WebAssembly has led to a paradigm shift. In fact, Rust code can be compiled to WASM and be imported in a JavaScript (or even TypeScript) source file - for instance, <a href="https://github.com/seed-rs/seed" alt="seed-rs official repository">Seed</a> and <a href="https://github.com/prisma/prisma" alt="Prisma Official repository">Prisma</a> follow this approach -, but that doesn’t come without limitations and gotchas, even for relatively small projects that abide to standard Rust patterns. From silenced warnings and obfuscated panic errors to structs that cannot be serialized and typed automatically, the path of porting Rust code to a JS app in production is a steep one, even when we don’t consider the I/O limitations that WASI should address.</p>

	<p>In this presentation, we will look at a language parser written in Rust, compiled with <a href="https://github.com/rustwasm/wasm-bindgen" alt="wasm-bindgen official repository">wasm-bindgen</a> and interpreted by Node.js, observing some limitations for production use cases and discussing alternatives. There’s no free lunch: WebAssembly - albeit useful - comes with its own set of challenges, and I trust this talk will help you navigate potential issues before they impact your deadlines.</p>
	"""
[[extra.days.talks]]
	time="17:00 - 17:30"
	title="Panel (Details tbd)"
	description="""
	"""

[[extra.days]]
	day="2"
	date="October, 14 - Friday"
[[extra.days.talks]]
	time="9:00 - 10:00"
	title="Doors Open & Breakfast"
	isBreak=true
[[extra.days.talks]]
	time="10:00 - 10:30"
	id="ryan-levick"
	speaker="Ryan Levick"
	title="Rust governance"
	description="""
	<p>The Rust project is a globally distributed collection of hundreds of individuals who all have different reasons for dedicating various amounts of time and energy in service of making Rust a great programming language. Despite (or maybe because of) this unique constellation of motivation, perspectives, and backgrounds, complex technical and organizational decisions get made every single day. But how is all of this coordinated?</p>

	<p>In this talk, we’ll explore the inner workings of Rust project governance. We’ll dive into the unique features and challenges associated with Rust’s distributed and consensus oriented decision-making process, and we’ll try to form an understanding of what makes one of the largest and most complex open-source projects tick. By the end, you’ll have a better understanding of what makes open source at scale so challenging, and you’ll be better prepared to engage meaningfully in discussions about how the Rust project can and should be run in the future.</p>
	"""
[[extra.days.talks]]
	time="10:45 - 11:15"
	id="aissata-maiga"
	speaker="Aïssata Maiga"
	id2="henrik-alser"
	speaker2="Henrik Alsér"
	title="Embed it yourself"
	description="""
	<p>This talk will provide you the resources you need to get started with embedded development in Rust, from home.</p>
	<p>You will be presented an overview of the current landscape of embedded Rust - the community, ecosystem, open source tooling and some demonstrations of the powerful language features that makes embedded development in Rust performant yet portable, fun and approachable to anyone.</p>
	<p>There will be blinky lights and real hardware.</p>
	"""
[[extra.days.talks]]
	time="11:30 - 12:00"
	id="colin-finck"
	speaker="Colin Finck"
	title="Don't Use This Crate, ...unless you have to - Windows Linked Lists in safe and idiomatic Rust"
	description="""
	<p>Don’t Use This Crate, …unless you have to. Linked lists are inefficient with regard to caching and memory usage, and there is almost always a better tool for the job. Nevertheless, linked lists are also used in all major operating system kernels for decades and we can’t just forget about them.</p>
	<p>I will present nt-list, my Rust crate to work with Windows Linked Lists in a safe and idiomatic fashion. Better known as <code>LIST_ENTRY</code> and <code>SINGLE_LIST_ENTRY</code>, they are used by the Windows kernel, drivers, and components influenced by Windows (e.g. UEFI) to uniformly handle linked lists. I will go into detail about differences between textbook linked lists and the Windows variant, various misuses of Windows linked lists I’ve seen in the past, and the challenges in coming up with a safe Rust implementation that makes these mistakes impossible.</p>
	<p></p>
	"""
[[extra.days.talks]]
	time="12:00 - 13:00"
	title="Lunch"
	isBreak=true
[[extra.days.talks]]
	time="13:00 - 13:30"
	id="raphael-gomes"
	speaker="Raphaël Gomès"
	title="Oxidizing Mercurial: the good and the less good"
	description="""
	<p>Mercurial is a 17 year-old, mainly Python codebase with a bit of C. There are lots of interesting and unexpected challenges that come with rewriting parts of any such software, and some unique to version control systems: from FFI overhead, not reintroducing bugs, testing, mixed encoding issues, to less technical issues like inexperience with Rust and a lack of reviewers, our journey with Rust has not been smooth sailing.</p>
	<p>Nevertheless, Rust helps breathe new air into the Mercurial story by being a much better fit to develop a VCS in than Python. The speed improvements alone would be enough justification but the developer ergonomics are the real main selling point on a lot of levels.</p>
	"""
[[extra.days.talks]]
	time="13:45 - 14:15"
	id="bogdan-kolbik"
	speaker="Bogdan Kolbik"
	title="How to use a Rust library inside the JVM application"
	description="""
	<p>We managed to rewrite the core of a big Scala application in Rust while keeping all the supporting code untouched. This talk is about how we did it, what problems we faced and how we solved them. It involves JNI, Protobuf, Trojan horses, and a reference to The Hitchhiker’s Guide to the Galaxy.</p>
	"""
[[extra.days.talks]]
	time="14:30 - 15:00"
	id=""
	speaker=""
	title="Lightning talks"
	description="""
	<p></p>
	"""
[[extra.days.talks]]
	time="15:00 - 15:30"
	title="Snack Break"
	isBreak=true
[[extra.days.talks]]
	time="15:30 - 16:00"
	id="tobias-hunger"
	speaker="Tobias Hunger"
	title="Rust and C++"
	description="""
	<p>Rust was designed to interoperate with other languages, but this interoperability is primarily based on C data structures and functions. This is limiting for C++ applications, because instances of C++ classes do not have a standardized representation in C. How can we expose Rust interfaces to C++ and the other way around?</p>
	<p>At Slint we develop a UI toolkit in and for Rust. We also provide quality C++ bindings and integrate with existing C++ libraries. We do have to deal with interoperability issues on a regular basis. In this presentation we are going to review the crates we use to achieve interoperability, as well as the tricks we learned using C++ libraries and how we expose a modern C++ API to our Rust code, including a first-class CMake integration.</p>
	"""
[[extra.days.talks]]
	time="16:15 - 16:45"
	id="sasha-pourcelot"
	speaker="Sasha Pourcelot"
	title="Parsing Rust Code Considered Harmful"
	description="""
	<p>I plan to discuss the different static analysis techniques that were used in the development of cargo-breaking.</p>
	<p>We’ll start with basic Rust code parsers and show that, although being super simple, they require complex manipulations when it comes to import resolution and dependency handling.</p>
	<p>Then we’ll use the Rust compiler as a library and dive deep in its internal API. While this approach allows us to capture all the subtilities of a Rust crate, we’ll show that it requires just too much maintenance and involves a huge complexity, potentially slowing down the development.</p>
	<p>Once this is done, we’ll discuss how we can leverage rustdoc in order to extract the API of the crate and get a lot of super useful metadata in the process. This approach allowed us to do great process in the cargo-breaking development, as it allowed us to get all the data we needed while not being too complex to analyze.</p>
	<p>At the end of the talk, we’ll allow ourselves to dream of the future. We could maybe add a plugin system to rust-analyzer and perform custom analysis in real time, so the diagnosis can be provided to the user after each key press.</p>
	"""
[[extra.days.talks]]
	time="16:15 - 16:45"
	id="dmitriy-kovalenko"
	speaker="Dmitriy Kovalenko"
	title="The art of programmatic videos with rust"
	description="""
	<p>This is going to be a release of https://fframes.studio. I’ve spend mostly 2 years to actually built it and dived into the video programming a lot. Videos are actually a sequence of images properly encoded. But how you can make your own video from scratch with only the code?</p>
	<p>Here is a list of things you will know after attending this talk:</p>
	<ol>
		<li>How videos works under the hood? What are codecs and how they work?</li>
		<li>How to make a video with a code?</li>
		<li>Why using rust? 3.1 Interop with libav aka ffmpeg 3.2 Memory efficient frame rendering 3.3 GPU support</li>
		<li>Rendering frames problem. Browser vs Rust in svg rendering</li>
		<li>Audio creation remixing and blending</li>
		<li>GPU for video rendering</li>
	</ol>
	<p>And also you will have everything to start making videos programatically with Rust. Gonna be 🔥</p>
	"""
[[extra.days.talks]]
	time="20:00 - 00:00"
	title="Closing Dinner"
	isBreak=true

+++
