+++
title = "Introduction to Diesel: basic and advanced concepts in practice"
template = "workshop.html"
[extra]
  date = "Oct. 9th, 2024, 10:00 - 16:00"
  sponsor = ""
  mentor = "Georg Semmler"
  avatar = "georg.png"
  avatar_alt = "Georg Semmler"
  bio = "Georg has been working on open-source software for over a decade, with a focus on Rust’s database ecosystem in recent years. As a maintainer of Diesel ORM, he has contributed to its development and helped users solve complex problems. Georg contributes to the Rust compiler to improve the compilation error reporting story for trait-heavy crates.<br> He is a researcher and software developer at GiGa infosystems, where he uses Rust to develop a database system for managing large amounts of geoscientific data. Georg is passionate about sharing his knowledge and experience with the Rust community and helping others improve their programming skills."
  url= "https://github.com/weiznich"
  abstract= "Diesel is a performant and type-safe query builder and ORM for Rust. This workshop teaches how to build performant applications using Diesel. It starts with the basics and goes all the way to advanced use-cases. After this workshop you will be well equipped to fully use Diesel’s features.*"
+++


<meta property="og:image" content="/images/workshops/og-images/og-image-diesel.png" />

<div class="syllabus mb-10">
  <h2 class="my-7">Syllabus</h2>
  <ol>
   <li class="mb-7 border">
      <h4 class="p-4 border-b">1. Introducing Diesel</h4>
      <div class="p-4 mw-80">
        <p>As the first step of our workshop, we will look at Diesel from a high-level point of view. You will set up a small example application together to get a working environment for the later stages of the workshop.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4 class="p-4 border-b">2. CRUD statements</h4>
      <div class="p-4 mw-80">
        <p>We will explain how Diesel models Insert, Query, Update and Delete statements. You will extend our example application to perform each of these operations. As part of this step, you will see which of the offered options for each operation should be used in which use case.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4 class="p-4 border-b">3. Diesel-Async and when you should use it</h4>
      <div class="p-4 mw-80">
        <p>We will discuss the differences between the regular `diesel` crate and the `diesel-async` crate. You will learn how they interact with each other, the advantages and disadvantages of each crate, and when to use one or the other.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4 class="p-4 border-b">4. Extending Diesel’s built-in DSL</h4>
      <div class="p-4 mw-80">
        <p>Diesel offers many features out-of-the-box, but sooner or later you may want to use something that’s not supported by the built-in DSL. In this workshop section you will learn how to extend the DSL (domain specific language) in such cases. It will be shown how to support custom SQL types and otherwise unsupported SQL constructs.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4 class="p-4 border-b">5. Diesel internals</h4>
      <div class="p-4 mw-80">
        <p>We will show how Diesel works internally. We will demonstrate how the compile time guarantees offered by Diesel are implemented to explain various restrictions in the API.</p>
      </div>
    </li>
    <li class="mb-7 border">
      <h4 class="p-4 border-b">6. Custom Connection/Backend implementation</h4>
      <div class="p-4 mw-80">
        <p>We will show how Diesel works internally. We will demonstrate how the compile time guarantees offered by Diesel are implemented to explain various restrictions in the API.</p>
      </div>
    </li>
  </ol>
  <p class="p-4">
  *Attendees should be familiar with basic Rust constructs. No prior experience with Diesel is required nor assumed. Attendees should bring their own laptop, with Rust and their favourite IDE installed.
</p>
</div>
