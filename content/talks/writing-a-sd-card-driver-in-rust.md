+++
title = "Writing a SD Card driver in Rust"
template = "talk.html"
[extra]
  date = "Oct. 11th, Friday"
  time = "11:30 - 12:00"
  speakers = ["jonathan-pallant"]
  description = "<p>The SD Card specification is an interesting example of a protocol which runs over an SPI bus, and provides access to blocks on the disk. We’ll dig into the Embedded Devices Working Group’s “embedded-hal”, which allows us to write an SD Card driver that works with almost any microcontroller and see how we can use Rust types to represent the commands and responses we need to be able to talk to an SD Card and get it initialised. We’ll then look at the Microsoft FAT filesystem, and see how blocks on disk can represent the files and directories we’re familiar with. We’ll then run a few demos to see what we’ve learned in action.</p>"
  ogimage = "/images/talks/og-images/writing-a-sd-card-driver-in-rust.png"
+++
