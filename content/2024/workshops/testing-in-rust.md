+++
title = "Testing in Rust: going beyond the basics"
template = "2024/workshop.html"
[extra]
  date = "Oct. 9th, 2024, 10:00 - 16:00"
  sponsor = "Mainmatter"
  mentors = [
    { name = "Luca Palmieri", avatar = "luca.png", avatar_alt = "Luca Palmieri",  bio = "Luca Palmieri works as a Principal Engineering Consultant for Mainmatter. Luca Palmieri builds technology products for a living. His current focus is on backend development, software architecture and the Rust programming language. He is the author of 'Zero to Production in Rust'.",  url = "https://www.lpalmieri.com/",  twitter = "algo_luca" }
  ]
  abstract = "No application is an island: you need to interact with third-party APIs, databases and who knows what else. Testing those interactions is tricky, to say the least! This workshop will focus on expanding your Rust testing toolkit, going beyond the basic techniques you're already familiar with. At the end of the session, you'll have a strategy to test most of the scenarios that are relevant for a complex Rust application."
  ogimage = "2024/images/workshops/og-images/og-image-testing.png"
+++

<div class="syllabus mb-10">
  <h2 class="my-7">Syllabus</h2>
  <ol>
    <li class="mb-7 border">
      <h4 class="p-4 border-b">1. Expanding your toolbox: better assertions</h4>
      <div class="p-4 mw-80">
        <p>The Rust standard library provides a few macros to perform assertions in your tests: assert!, assert_eq!, etc. They are good enough to get started, but the error messages they produce will often fail to keep up with the complexity of your assertions: we'll explore different libraries to boost the clarity of your test failures.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4 class="p-4 border-b">2. Expanding your toolbox: snapshot testing</h4>
      <div class="p-4 mw-80">
        <p>Snapshot testing is a technique that allows us to capture the output of a system under test and compare it with a previously saved version. It is quite useful when working with complex data that might change frequently, such as HTML or error messages. We will explore how to use the insta crate to implement snapshot testing and manage the snapshots lifecycle.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4 class="p-4 border-b">3. Isolating your tests: the filesystem</h4>
      <div class="p-4 mw-80">
        <p>All tests in Rust share the same filesystem as the underlying host, a problematic situation when multiple tests want to interact with the "same" files or touch directories that could affect the behaviour of the system they are being executed from. We will explore various techniques to manage this scenario, including the tempfile crate.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4 class="p-4 border-b">4. Isolating your tests: the database</h4>
      <div class="p-4 mw-80">
        <p>The database is another shared resource that can cause problems when running tests in parallel. We will explore how to use Docker to run an isolated database instance for each test, and how to use the sqlx crate to manage the database lifecycle.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4 class="p-4 border-b">5. Isolating your tests: HTTP mocking</h4>
      <div class="p-4 mw-80">
        <p>It is undesirable to have tests that hit real HTTP endpoints from third-party APIs, for a variety of reasons. We will explore how to use the wiremock crate to shield our tests from the outside world and make assertions on the HTTP requests that are being sent.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4 class="p-4 border-b">6. Isolating your tests: mocks, stubs and fakes</h4>
      <div class="p-4 mw-80">
        <p>In order to isolate the behaviour of a system under test, it is not unusual to replace some of its dependencies with "fake" implementations. We will explore the different types of fakes and how to use them in Rust. We will review, in particular, the mockall crate and the testing implications of using generics and dynamic dispatch for polymorphism.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4 class="p-4 border-b">7. Custom test runners: what is a test?</h4>
      <div class="p-4 mw-80">
        <p>We will take a look under the hood to understand how the Rust built-in testing framework works. Armed with this knowledge, we will explore the runtime implications of different approaches for test organisation. We will also cover alternative test runners, such as cargo-nextest.</p>
      </div>
    </li>
	<li class="mb-7 border">
      <h4 class="p-4 border-b">8. Custom test runners: executing logic before and after a test run</h4>
      <div class="p-4 mw-80">
        <p>It is often desirable to execute the same logic before and after each test in our suite. We will explore a variety of techniques to achieve this, from a bespoke #[test_case] procedural macro to a custom test harness (via libtest_mimic).</p>
      </div>
    </li>
	<li class="mb-7 border">
      <h4 class="p-4 border-b">9. Custom test runners: capstone project</h4>
      <div class="p-4 mw-80">
        <p>We will combine everything we have learned so far into an easy-to-use setup that allows you to run black-box tests against a real database and a real HTTP server, without having to orchestrate multiple commands—just cargo test and you are good to go!</p>
      </div>
    </li>
  </ol>
  <p class="p-4">
  *The workshop is designed for software developers who have a good understanding of Rust's basic concepts and want to move beyond the built-in testing toolkit.
</p>
</div>
