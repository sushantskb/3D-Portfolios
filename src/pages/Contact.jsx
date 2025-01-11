import { Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";

import Loader from "../components/Loader";
import Fox from "../models/Fox";
const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = () => {
    setCurrentAnimation("idle");
  };

  const handleFocus = () => {
    setCurrentAnimation("walk");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Sushant",
          from_email: form.email,
          to_email: "sushantbishoi@developer.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);

        setTimeout(() => {
          setCurrentAnimation("idle");
          setForm({ name: "", email: "", message: "" });
        }, [3000]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setCurrentAnimation("idle");
      });
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: "url('/bg.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/30 z-10"></div>
      <section className=" relative flex lg:flex-row flex-col max-container z-20">
        <div className="flex-1 min-w-[50%] flex flex-col">
          <h1 className="head-text text-slate-300" style={{ textShadow: "2px 2px 4px black" }}>
            Get in Touch
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-7 mt-14">
            <label className="text-slate-200 font-semibold">
              Name
              <input
                type="text"
                name="name"
                className="input"
                placeholder="John"
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="text-slate-200 font-semibold">
              Email
              <input
                type="email"
                name="email"
                className="input"
                placeholder="John@gmail.com"
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="text-slate-200 font-semibold">
              Your Message
              <textarea
                name="message"
                rows="4"
                className="textarea"
                placeholder="Write your thoughts here..."
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn"
              onFocus={handleFocus}
              onBlur={handleBlur}>
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>

        <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
          <Canvas
            camera={{
              position: [0, 0, 5],
              fov: 75,
              near: 0.1,
              far: 1000,
            }}>
            <directionalLight intensity={2.5} position={[0, 0, 1]} />
            <ambientLight intensity={0.5} />
            <Suspense fallback={<Loader />}>
              <Fox
                currentAnimations={currentAnimation}
                position={[0.5, 0.35, 0]}
                rotation={[12.6, -0.6, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
    </div>
  );
};

export default Contact;
