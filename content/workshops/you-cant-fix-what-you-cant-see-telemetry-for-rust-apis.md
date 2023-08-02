+++
title = "You can't fix what you can't see: telemetry for Rust APIs"
template = "workshop.html"
[extra]
	date = "Oct 11 2023, 10:00 - 16:00"
	avatar = "luca-palmieri.webp"
	avatar_alt = "Luca Palmieri"
	sponsor = "mainmatter"
+++

<p>
	Your Rust application has finally been deployed to production! Nice! But is it working? This workshop will introduce you to a comprehensive toolkit to detect, troubleshoot and resolve issues in your Rust APIs.
</p>
<p>All workshop participants will receive a free 3 month <a href="https://www.jetbrains.com/clion/" target="_blank">CLion</a> license valid for personal use from our friends at JetBrains.</p>
<h4>Target Audience</h4>
<p>
This workshop is designed for developers who are operating Rust services in production-like environments, or are preparing to do so.
</p>
<h4>Contents</h4>
<ul>
	<li>
		<p>Structured logging (tracing)</p>
		<p>An introduction to the `tracing` instrumentation library, covering both how to instrument your code (capturing fields, log levels, macros) and how to process the resulting telemetry data in your application (subscriber configuration, logging levels, log filtering).</p>
	</li>
	<li>
		<p>Error handling</p>
		<p>We will cover Rust’s `Error` trait, with a focus on the information that can be retrieved and recorded in your logs; we will also spend some time on logging patterns (e.g. when should an error be logged?) and relevant libraries for error handling (anyhow/thiserror).</p>
	</li>
	<li>
		<p>Panic handling</p>
		<p>You should always manage to capture details about what went wrong, even if it’s due to an uncaught panic rather than an error. We will review panic hooks and integrate them in our `tracing` setup.</p>
	</li>
	<li>
		<p>Metrics, both for application and runtime (tokio-metrics)</p>
		<p>Structured logs are important, but they don’t tell the full story. We will look at how to capture metric data using the `metrics` library, as a tool for designing alarms as well troubleshooting faulty behaviour. We will spend some time on `tokio-metrics` and how to interpret the data it shows with respect to your `tokio` runtime usage.</p>
	</li>
</ul>
<h4>Prerequisites</h4>
<p>We will send a detailed list of instructions for preparation. 
This information will be provided closer to the workshop date.</p>
<h4>About Luca Palmieri</h4>
<p>Luca Palmieri builds technology products for a living, and has been doing so for a while. His current focus is on backend development, software architecture and the Rust programming language.</p>
<p>
When he is not coding, you’ll find him baking cakes or rolling pasta sheets.
</p>
