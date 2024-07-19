+++
title = "My Journey from WebDev to Medical Visualization Rustacea"
template = "talk.html"
[extra]
  date = "Oct. 11th, Friday"
  time = "13:30 - 14:00"
  speakers = ["david-peherstorfer"]
  description = "<p>My partner and I became parents this year. When we learned that our son has a congenital heart defect I decided to do something to make his life better. This is when I remembered this one class about “Medical Visualization” and I decided to start my journey into this field using Rust (which I had previously learned).</p><p>In my talk I will quickly go through how I studied Rust as a total beginner yet experienced developer. I will present how volumetric medical data can be rendered in 3D. For this, I used a raycasting technique which I will show you the basics of. Then I will dive into my journey through graphical Rust crates (three-d, gl, glow, wgpu).</p><p>From the three-d crate I used the volume rendering example and extended it to be able to render DICOM files. Since I was not satisfied with the displayed result I went a level deeper and created my own volume renderer using raycasting. For this I started out with the gl crate. After making it work and being super proud I decided to switch to glow because of it being exposed by the three-d crate. Furthermore, I also ported this renderer to wgpu.</p><p>And finally I will present my result by giving you a live demo of a volume renderer that has camera and threshold controls and can switch between three different raycasting shaders.</p>"
  ogimage = "/images/talks/og-images/my-journey-from-webdev-to-medical-visualization-rustacea.png"
+++
