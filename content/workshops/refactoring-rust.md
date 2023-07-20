+++
title = "Refactoring Rust"
template = "workshop.html"
[extra]
	date = "Oct 11 2023, 10:00 - 16:00"
	avatar = "stefan-baumgartner.jpeg"
	avatar_alt = "Stefan Baumgartner"
+++

<p>
	Rust is undeniably syntax-heavy. There’s a lot of intent to express, and Rust wants you to be explicit. All the extra effort can result in bloated code and hard-to-use APIs. Especially features like the trait system, error handling, and ownership add another layer of complexity that can't be controlled by the usual refactoring techniques we have been teaching for the last decades.
</p>
<p>
	In this hands-on workshop, we refactor a Rust program that has just left the prototyping stage into code that is a delight to read and follow, easy to use, easy to maintain, and that plays along nicely with the ecosystem. We take a real-world program and refactor it piece by piece. As a last step, we will write a new feature for both the original and the refactored version. The comparison will amaze you!
</p>
<h4>Target Audience</h4>
<p>
This workshop is designed for developers who are working on Rust codebases already and are looking to level up their skills.
</p>
<h4>Contents</h4>
<ul>
	<li>
		<p>Part 1: Readable Code</p>
		<p>Rust is a modern, expressive language. We look at tooling, formatting, and naming conventions and see the effective use of existing syntax. Often times there are shortcuts that make things a lot easier! We also see which possibilities exist for polymorphism.</p>
	</li>
	<li>
		<p>Part 2: Structs and Error Handling</p>
		<p>Rust’s error handling makes programming a lot of fun and fantastically safe if you know all the possibilities that they offer. We learn about proper error handling, happy path programming, and learn about the most useful methods of <code>Result</code> and <code>Option</code>.</p>
	</li>
	<li>
		<p>Part 3: Traits</p>
		<p>Traits are our main access for abstraction. We look at conversion traits, the most important derivable traits, and how to connect your application to the existing Rust ecosystem.</p>
	</li>
	<li>
		<p>Part 4: Design Patterns</p>
		<p>Finally, we see which design patterns exist in the world of Rust and how we can apply them. We learn about extension traits, and the builder pattern, and see how ownership changes our API design.</p>
	</li>
</ul>
<h4>Prerequisites</h4>
<p>We will send a detailed list of instructions for preparation, including the installation of compiler toolchains, editors, and recommended plugins. Additionally, we will share a Github project with workshop materials. This information will be provided closer to the workshop date.</p>
<h4>About Stefan Baumgartner</h4>
<p>Stefan Baumgartner is an architect and developer based in Austria who specializes in serverless technologies. He has authored two books on TypeScript and is also the organizer of the Rust Linz meetup.</p>
